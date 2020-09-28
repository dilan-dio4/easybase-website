/* eslint-disable no-fallthrough */
import React, { useState, useMemo, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import isEmpty from 'lodash/isEmpty';
import QueryListGenerator from './QueryListGenerator';
import Prism from 'prismjs/components/prism-core';
import { HelpButton } from './common/utils';
import * as Container from './IntegratorPopupDialogContents-Container';

import 'prismjs/components/prism-markup-templating';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-swift';
import 'prismjs/components/prism-csharp';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-php';
import 'prismjs/components/prism-markup'

import "prismjs/themes/prism-okaidia.css";
import './CustomCodeStyles.css';
import 'prismjs/plugins/normalize-whitespace/prism-normalize-whitespace';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <>{children}</>
            )}
        </div>
    );
}


const IntegratorPopupDialogContent = ({ options, onClose }) => {

    const { redisID, type, typeFormats, queryObject, accessorToColumnTypeMap, defaultValues, authentication } = options;

    const [ selectedTab, setSelectedTab ] = useState(0);
    const [ typeToValueMap, setTypeToValueMap ] = useState(Object.keys(accessorToColumnTypeMap).reduce((agg, curr) => ({...agg, [curr]: null}), {}));

    // GET
    const [ codeLimit, setCodeLimit ] = useState(10);
    const [ codeOffset, setCodeOffset ] = useState(0);
    const [ isLimitReturnAll, setIsLimitReturnAll ] = useState(false);
    
    // POST
    const [ insertAtEnd, setInsertAtEnd ] = useState(false);

    // UPDATE
    const [ updateValues, setUpdateValues ] = useState(Object.keys(accessorToColumnTypeMap).reduce((agg, curr) => ({...agg, [curr]: null}), {}));

    const classes = Container.useStyles();

    const language_content = useMemo(() => {
        let fixedTypeToValueMap = {};
        switch (type) {
            case "GET":
                fixedTypeToValueMap = { limit: codeLimit, offset: codeOffset, ...typeToValueMap };
                if (isLimitReturnAll) delete fixedTypeToValueMap.limit;
                if (codeOffset === 0) delete fixedTypeToValueMap.offset;
                if (authentication.authActive === true) fixedTypeToValueMap.authentication = "YOUR_AUTHENTICATION_KEY";
                return Container.generateGETLanguageContent(redisID, typeFormats, fixedTypeToValueMap); 
            case "UPDATE":
                fixedTypeToValueMap = { updateValues, ...typeToValueMap };
                if (authentication.authActive === true) fixedTypeToValueMap.authentication = "YOUR_AUTHENTICATION_KEY";
                return Container.generateUPDATELanguageContent(redisID, fixedTypeToValueMap);
            case "DELETE":
                fixedTypeToValueMap = { ...typeToValueMap };
                if (authentication.authActive === true) fixedTypeToValueMap.authentication = "YOUR_AUTHENTICATION_KEY";
                return Container.generateDELETELanguageContent(redisID, fixedTypeToValueMap);
            case "CUSTOM":
                fixedTypeToValueMap = { limit: codeLimit, offset: codeOffset, ...typeToValueMap };
                if (isLimitReturnAll) delete fixedTypeToValueMap.limit;
                if (codeOffset === 0) delete fixedTypeToValueMap.offset;
                if (authentication.authActive === true) fixedTypeToValueMap.authentication = "YOUR_AUTHENTICATION_KEY";
                return Container.generateCUSTOMLanguageContent(redisID, fixedTypeToValueMap);
            case "POST":
                fixedTypeToValueMap = { insertAtEnd, ...typeToValueMap };
                if (authentication.authActive === true) fixedTypeToValueMap.authentication = "YOUR_AUTHENTICATION_KEY";
                return Container.generatePOSTLanguageContent(redisID, fixedTypeToValueMap);
            case "TABLE":
                fixedTypeToValueMap = { ...typeToValueMap };
                if (authentication.authActive === true) fixedTypeToValueMap.authentication = "YOUR_AUTHENTICATION_KEY";
                return Container.generateTABLELanguageContent(redisID, fixedTypeToValueMap);
            default:
                break;
        }
        
    }, [ redisID, typeFormats, codeLimit, codeOffset, isLimitReturnAll, typeToValueMap, type, insertAtEnd, authentication, updateValues ]);

    useEffect(() => {
        Prism.plugins.NormalizeWhitespace.setDefaults({
            'remove-trailing': true,
            'remove-indent': true,
            'left-trim': true,
            'right-trim': true,
        });
    }, []);
    
    function getURLElement() {
        var elements = document.querySelectorAll('span');
        return Array.prototype.filter.call(elements, function (element) {
            return RegExp(Container.generateBareUrl(redisID, type.toLowerCase())).test(element.textContent);
        })[0];
    }

    function getAuthentationValueElement() {
        var elements = document.querySelectorAll('span');
        return Array.prototype.filter.call(elements, function (element) {
            return RegExp("YOUR_AUTHENTICATION_KEY").test(element.textContent);
        })[0];
    }

    useEffect(() => {
        Prism.highlightAll();
        try {
            getURLElement().classList.add('highlight-red');
        } catch {}
        try {
            getAuthentationValueElement().classList.add('highlight-red');
            getAuthentationValueElement().classList.add('highlight-italic');
        } catch {}
    }, [ selectedTab, typeFormats, codeLimit, codeOffset, isLimitReturnAll, typeToValueMap, type, insertAtEnd, updateValues ]);

    const handleCodeLimitChange = e => {
        e.target.value >= 0 && setCodeLimit(Number(e.target.value));
    }

    const handleCodeOffsetChange = e => {
        e.target.value >= 0 && setCodeOffset(Number(e.target.value));
    }

    const handleQueryValueChange = (new_val, key) => {
        setTypeToValueMap(prev => {
            prev[key] = new_val;
            return {...prev};
        });
    }

    const handleUpdateValueChange = (new_val, key) => {
        setUpdateValues(prev => {
            prev[key] = new_val;
            return {...prev};
        });
    }

    return (
        <div style={{ backgroundColor: 'white', width: 1030, maxWidth: 1030 }}>
            <Tabs
                scrollButtons="auto"
                onChange={(_, newVal) => setSelectedTab(newVal)} 
                variant="scrollable" 
                aria-label="language example integration helper tabs"
                value={selectedTab}
                indicatorColor="primary"
                textColor="primary"
                classes={{ root: classes.tabsBorder }}
            >
                { language_content.map(ele => <Tab label={ele.language_name} key={`${ele.language_name}`} />) }
            </Tabs>
            {
                language_content.map((ele, index) => (
                    <TabPanel value={selectedTab} index={index} className={classes.refractorRoot} key={`${ele.code_string}`}>
                        <pre className={classes.codeRoot}>
                            { typeof ele.code_string === 'string' ?
                                <code className={`language-${ele.prism_code}`}>
                                    {ele.code_string}
                                </code>
                                :
                                ele.code_string
                            }
                        </pre>
                        { 'footer' in ele && <div className="d-flex align-items-center pt-1" style={{ height: 30 }}>{ele.footer}</div> }
                    </TabPanel>
                ))
            }

            <div className={classes.refractorRoot}>
                <pre className={classes.codeRoot}>
                    <code>
                        <span className="token punctuation">Integration ID:</span> <span className="token string">{redisID}</span>
                    </code>
                </pre>
            </div>

            {(() => {
                switch (type) {
                    case "GET":
                        return (
                            <div className={clsx("d-flex align-items-start justify-content-space-between", classes.refractorRoot)}>
                                <div className="ml-2 d-flex">
                                    <div className="d-flex align-items-center">
                                        <Typography variant="body1" className="pr-3">offset: </Typography>
                                        <TextField
                                            variant="outlined"
                                            value={codeOffset}
                                            onChange={handleCodeOffsetChange}
                                            type="number"
                                            size="small"
                                            style={{ width: 75 }}
                                            className="mr-5"
                                        />

                                    </div>

                                    <div className="d-flex align-items-center">
                                        <Typography variant="body1" className="pr-3">limit: </Typography>
                                        <TextField
                                            variant="outlined"
                                            value={codeLimit}
                                            onChange={handleCodeLimitChange}
                                            type="number"
                                            size="small"
                                            style={{ width: 75 }}
                                            disabled={isLimitReturnAll}
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox color="primary" checked={isLimitReturnAll} onChange={e => setIsLimitReturnAll(e.target.checked)} />
                                            }
                                            label="Return all"
                                            className="ml-1"
                                        />
                                    </div>
                                </div>

                                <Paper elevation={4} className={clsx("mr-4", classes.optionsPaper)}>
                                    <HelpButton className={classes.helpIcon} to="https://easybase.io/about/2020/09/15/Customizing-query-values/" />
                                    <div class="px-4 py-2">
                                        <Typography variant="h6" className="mt-3">Customize Query Values: </Typography>
                                        <Typography variant="body2" className="mt-1 mb-4" style={{ color: '#757575' }}>Overwrite the values in an imported query.</Typography>
                                        {isEmpty(queryObject) ?

                                            <Typography className="my-4" style={{ color: '#757575' }} >Import a query to customize values.</Typography>
                                            :
                                            isEmpty(typeToValueMap) ?
                                                <Typography className="my-4" style={{ color: '#757575' }} >Add the columns that you want to return from this query under 'GET' in the integration editor drawer.</Typography>
                                                :
                                                <QueryListGenerator
                                                    accessorToColumnTypeMap={accessorToColumnTypeMap}
                                                    typeToValueMap={typeToValueMap}
                                                    queryValueChangeCallback={handleQueryValueChange}
                                                    largeText
                                                    formatAccessorNames
                                                />
                                        }
                                    </div>
                                </Paper>
                            </div>
                        )
                    case "UPDATE":
                        return (
                            <div className={clsx("d-flex align-items-start justify-content-space-between", classes.refractorRoot)}>
                                <Paper elevation={4} className={clsx("ml-4", classes.optionsPaper)}>
                                    <HelpButton className={classes.helpIcon} to="https://easybase.io/about/2020/09/15/EasyBase-data-types/" />
                                    <div class="px-4 py-2">
                                        <Typography variant="h6" className="mt-3">New Values: </Typography>
                                        <Typography variant="body2" className="mt-1 mb-4" style={{ color: '#757575' }}>All matches will be updated with these values.</Typography>
                                            <QueryListGenerator
                                                accessorToColumnTypeMap={accessorToColumnTypeMap}
                                                typeToValueMap={updateValues}
                                                queryValueChangeCallback={handleUpdateValueChange}
                                                largeText
                                            />
                                    </div>
                                </Paper>

                                <Paper elevation={4} className={clsx("mr-4", classes.optionsPaper)}>
                                    <HelpButton className={classes.helpIcon} to="https://easybase.io/about/2020/09/15/Customizing-query-values/" />
                                    <div class="px-4 py-2">
                                        <Typography variant="h6" className="mt-3">Customize Query Values: </Typography>
                                        <Typography variant="body2" className="mt-1 mb-4" style={{ color: '#757575' }}>Overwrite the values in an imported query.</Typography>
                                        {isEmpty(queryObject) ?

                                            <Typography className="my-4" style={{ color: '#757575' }} >Import a query to customize values via request.</Typography>
                                            :
                                            <QueryListGenerator
                                                accessorToColumnTypeMap={accessorToColumnTypeMap}
                                                typeToValueMap={typeToValueMap}
                                                queryValueChangeCallback={handleQueryValueChange}
                                                largeText
                                            />
                                        }
                                    </div>
                                </Paper>
                            </div>
                        )
                    case "DELETE":
                        return (
                            <div className={clsx("d-flex align-items-start justify-content-space-between", classes.refractorRoot)}>
                                <div className="ml-2 d-flex align-items-center">
                                </div>

                                <Paper elevation={4} className={clsx("mr-4", classes.optionsPaper)}>
                                    <HelpButton className={classes.helpIcon} to="https://easybase.io/about/2020/09/15/Customizing-query-values/" />
                                    <div class="px-4 py-2">
                                        <Typography variant="h6" className="mt-3">Customize Query Values: </Typography>
                                        <Typography variant="body2" className="mt-1 mb-4" style={{ color: '#757575' }}>Overwrite the values in an imported query.</Typography>
                                        {isEmpty(queryObject) ?

                                            <Typography className="my-4" style={{ color: '#757575' }} >Import a query to customize values via request.</Typography>
                                            :
                                            <QueryListGenerator
                                                accessorToColumnTypeMap={accessorToColumnTypeMap}
                                                typeToValueMap={typeToValueMap}
                                                queryValueChangeCallback={handleQueryValueChange}
                                                largeText
                                            />
                                        }
                                    </div>
                                </Paper>
                            </div>
                        )
                    case "POST":
                        return (
                            <div className={clsx("d-flex align-items-start justify-content-space-between", classes.refractorRoot)}>
                                <div className="ml-2 d-flex align-items-center">
                                    <FormControlLabel
                                        control={
                                            <Checkbox color="primary" checked={insertAtEnd} onChange={e => setInsertAtEnd(e.target.checked)} />
                                        }
                                        label="Insert record at end of collection"
                                        className="ml-1"
                                    />
                                </div>

                                <Paper elevation={4} className={clsx("mr-4", classes.optionsPaper)}>
                                    <HelpButton className={classes.helpIcon} to="https://easybase.io/about/2020/09/15/EasyBase-data-types/" />
                                    <div class="px-4 py-2">
                                        <Typography variant="h6" className="mt-3">New Values: </Typography>
                                        <QueryListGenerator
                                            accessorToColumnTypeMap={accessorToColumnTypeMap}
                                            typeToValueMap={typeToValueMap}
                                            queryValueChangeCallback={handleQueryValueChange}
                                            largeText
                                        />
                                    </div>
                                </Paper>
                            </div>
                        )
                    case "TABLE":
                        return (
                            <div className={clsx("d-flex align-items-start justify-content-space-between", classes.refractorRoot)}>
                                <div className="ml-2 d-flex align-items-center">
                                </div>

                                <Paper elevation={4} className={clsx("mr-4", classes.optionsPaper)}>
                                    <HelpButton className={classes.helpIcon} to="https://easybase.io/about/2020/09/15/Customizing-query-values/" />
                                    <div className="px-4 py-2">
                                        <Typography variant="h6" className="mt-3">Customize Query Values: </Typography>
                                        <Typography variant="body2" className="mt-1 mb-4" style={{ color: '#757575' }}>Overwrite the values in an imported query.</Typography>
                                        {isEmpty(queryObject) ?

                                            <Typography className="my-4" style={{ color: '#757575' }} >Import a query to customize values via request.</Typography>
                                            :
                                            <QueryListGenerator
                                                accessorToColumnTypeMap={accessorToColumnTypeMap}
                                                typeToValueMap={typeToValueMap}
                                                queryValueChangeCallback={handleQueryValueChange}
                                                largeText
                                            />
                                        }
                                    </div>
                                </Paper>
                            </div>
                        )
                    default:
                        break;
                }
            })()}
            <div style={{ height: 30 }}></div>
        </div>
    );
};

export default IntegratorPopupDialogContent;