import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { DatePicker } from 'antd';
import { dayjsUTC } from './common/utils';
import { TimePicker } from 'antd';
import ThreeSwitch from './common/ThreeSwitch';
import { accessorNameToColumnName } from 'eb-utils';

const useStyles = makeStyles(theme => ({
    singleComponent: {
        padding: theme.spacing(1, 0),
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'flex-end'
    },
    columnHeaderTypography: {
        wordBreak: 'break-all',
        fontWeight: 500,
        fontSize: 17,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
    },

}))

const QueryListGenerator = ({ accessorToColumnTypeMap, typeToValueMap, queryValueChangeCallback, largeText = false, formatAccessorNames = false }) => {

    const classes = useStyles();

    return (
        <>
            {Object.entries(accessorToColumnTypeMap).map(([key, value]) =>
                <div className="my-1 d-flex align-items-center w-100" key={`${key}`}>
                    <Typography className={largeText && classes.columnHeaderTypography} variant={!largeText ? "body1": "inherit"}>{formatAccessorNames ? accessorNameToColumnName(key) : key}</Typography>
                    <span className={classes.singleComponent}>
                        {(() => {
                            switch (value) {
                                case "time":
                                    return <TimePicker
                                        value={typeToValueMap[key] == null ? null : dayjsUTC().startOf('day').minute(typeToValueMap[key])}
                                        onChange={e => e === null ? queryValueChangeCallback(null, key) : queryValueChangeCallback((e.hour() * 60) + e.minute(), key)}
                                        format="h:mm a"
                                        getPopupContainer={trigger => trigger.parentNode}
                                        allowClear
                                        className="antd-integrator-popup"
                                    />
                                case "text":
                                case "richtext":
                                case "file":
                                case "image":
                                case "video":
                                    return <TextField
                                        variant="outlined"
                                        size="small"
                                        style={{ width: 125 }}
                                        value={typeToValueMap[key] === null ? "" : typeToValueMap[key]}
                                        onChange={e => e.target.value !== "" ? queryValueChangeCallback(e.target.value, key) : queryValueChangeCallback(null, key)}
                                    />
                                case "date":
                                    return <DatePicker
                                        value={typeToValueMap[key] == null ? null : dayjsUTC(typeToValueMap[key])}
                                        onChange={e => e === null ? queryValueChangeCallback(null, key) : queryValueChangeCallback(dayjsUTC(e).startOf('day').format("MM-DD-YYYY"), key)}
                                        allowClear
                                        className="antd-integrator-popup"
                                    />
                                case "location":
                                    return <div className="d-flex align-items-center justify-content-between pt-1 flex-row" style={{ width: 200 }}>
                                        <TextField type={'number'} inputProps={{ style: { fontSize: 14 } }} size="small" value={typeToValueMap[key] == null ? "" : typeToValueMap[key].split(",")[0]} onChange={e => typeToValueMap[key] == null ? queryValueChangeCallback("0,0", key) : queryValueChangeCallback(e.target.value === "" ? null : `${e.target.value},${typeToValueMap[key].split(",")[1]}`, key)} />
                                        <TextField type={'number'} inputProps={{ style: { fontSize: 14 } }} size="small" value={typeToValueMap[key] == null ? "" : typeToValueMap[key].split(",")[1]} onChange={e => typeToValueMap[key] == null ? queryValueChangeCallback("0,0", key) : queryValueChangeCallback(e.target.value === "" ? null : `${typeToValueMap[key].split(",")[0]},${e.target.value}`, key)} />
                                    </div>
                                case "number":
                                    return <TextField
                                        variant="outlined"
                                        type="number"
                                        size="small"
                                        style={{ width: 125 }}
                                        value={typeToValueMap[key]}
                                        onChange={e => e.target.value !== "" ? queryValueChangeCallback(Number(e.target.value), key) : queryValueChangeCallback(null, key)}
                                    />
                                case "boolean":
                                    return <ThreeSwitch
                                        value={typeToValueMap[key]}
                                        onChange={(e, newVal) => queryValueChangeCallback(newVal, key)}
                                    />
                                default:
                                    break;
                            }
                        })()}
                    </span>
                </div>
            )}
        </>
    )

}

export default QueryListGenerator;