/* eslint-disable no-mixed-operators */
import React, { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { withStyles, useTheme } from '@material-ui/core/styles'
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ClearIcon from '@material-ui/icons/Clear';
import Zoom from '@material-ui/core/Zoom';
import Tooltip from '@material-ui/core/Tooltip';

try { dayjs.utc().isUTC(); } catch (e) { dayjs.extend(utc); }

export const FREE_TIER_LIMIT = 10;

export const closeAnyPickers = function() 
{
    const open_picker = document.getElementsByClassName('ant-picker-focused')
    if(open_picker.length === 0) return;

    open_picker[0].getElementsByTagName('input')[0].blur()
    open_picker[0].getElementsByTagName('input')[0].dispatchEvent(new Event("blur"))
}

export const calcTextWidth = function (str, fontFamily, fontSize) {
    var div = document.createElement("div");
    div.innerHTML = str;
    var css = {
        'position': 'absolute', 'float': 'left', 'white-space': 'nowrap', 'visibility': 'hidden',
        'font-size': fontSize, 'font-family': fontFamily
    };
    for (let k in css) {
        div.style[k] = css[k];
    }
    div = document.body.appendChild(div);
    var w = div.offsetWidth;
    document.body.removeChild(div);
    return w;
}

function debounce(fn, ms) {
    let timer
    return _ => {
        clearTimeout(timer)
        timer = setTimeout(_ => {
            timer = null
            fn.apply(this, arguments)
        }, ms)
    };
}

export function useWindowSize() {
    const isClient = typeof window === 'object';

    function getSize() {
        return {
            width: isClient ? window.innerWidth : undefined,
            height: isClient ? window.innerHeight : undefined
        };
    }

    const [windowSize, setWindowSize] = useState(getSize);

    useEffect(() => {
        if (!isClient) {
            return false;
        }
        const handleResize = debounce(function handleResize() {
            setWindowSize(getSize())
        }, 100)

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []); // Empty array ensures that effect is only run on mount and unmount

    return windowSize;
}

export function getScrollBarWidth () {
  var inner = document.createElement('p');
  inner.style.width = "100%";
  inner.style.height = "200px";

  var outer = document.createElement('div');
  outer.style.position = "absolute";
  outer.style.top = "0px";
  outer.style.left = "0px";
  outer.style.visibility = "hidden";
  outer.style.width = "200px";
  outer.style.height = "150px";
  outer.style.overflow = "hidden";
  outer.appendChild (inner);

  document.body.appendChild (outer);
  var w1 = inner.offsetWidth;
  outer.style.overflow = 'scroll';
  var w2 = inner.offsetWidth;
  if (w1 === w2) w2 = outer.clientWidth;

  document.body.removeChild (outer);

  return (w1 - w2);
};

export function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ window.crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

export function keyifyQueryObject(o)
{
    let result = [];
    for (let key in o) {
        result.push(key);
        if (o[key] && typeof o[key] === "object") result.push(...keyifyQueryObject(o[key]));
    }

    result = result.filter((element) => (isNaN(element) && !element.startsWith('$')) )
    return result;
}

export const getBingMapsStaticImage = (latitude, longitude, width, height) => {
    const api_key = "AlC012ub8mZz5uMY2MbCQ9TwLAipNdA_egCPKN4eQIfJ7QrTBNCmeuHhma9qfpY7"
    return `http://dev.virtualearth.net/REST/v1/Imagery/Map/Road/${latitude},${longitude}/15?mapSize=${width},${height}&mapLayer=Basemap,Buildings&key=${api_key}`

}

export const updateDisplayedDataWithoutRender = (setDisplayedData, accessor, recordID, newValue) =>
{
    setDisplayedData(prev => {
        prev.find(ele => ele._id === recordID)[accessor] = newValue;
        return prev;
    })
}

export const renderRowOnDrawerRightSave = (newRowData, displayedData, setDisplayedData) => {

    const updated_row_index = displayedData.findIndex(ele => ele._id === newRowData._id);
    if (updated_row_index !== -1)
    {
        setDisplayedData(prev => {
            prev[updated_row_index] = newRowData;
            return [...prev];
        });
    }
};

export const isElementInDOM = (elem) => {

    if (elem.offsetWidth + elem.offsetHeight + elem.getBoundingClientRect().height + elem.getBoundingClientRect().width === 0) {
        return false;
    }
    const elemCenter = {
        x: elem.getBoundingClientRect().left + elem.offsetWidth / 2,
        y: elem.getBoundingClientRect().top + elem.offsetHeight / 2
    };
    if (elemCenter.x < 0) return false;
    if (elemCenter.x > (document.documentElement.clientWidth || window.innerWidth)) return false;
    if (elemCenter.y < 0) return false;
    if (elemCenter.y > (document.documentElement.clientHeight || window.innerHeight)) return false;

    return true;
}


export const appendToBucketFileName = (fullFileName, newEnding, isFullLink, newExtension = false) => {
    if (isFullLink)
    {
        const full_link_split = fullFileName.split('/');
        const bucket_hash = full_link_split.pop();
        let split_file_name = bucket_hash.split('.');
        if (newExtension === false) return full_link_split.join('/') + '/' + split_file_name[0] + newEnding + '.' + split_file_name[1];
        else return full_link_split.join('/') + '/' + split_file_name[0] + newEnding + '.' + newExtension; 
    } else {
        let split_file_name = fullFileName.split('.');
        if (newExtension === false) return split_file_name[0] + newEnding + '.' + split_file_name[1];
        else return split_file_name[0] + newEnding + '.' + newExtension;
    }

}

export function escapeHtml(string) {

    var matchHtmlRegExp = /["'&<>]/

    var str = '' + string
    var match = matchHtmlRegExp.exec(str)

    if (!match) {
        return str
    }

    var escape
    var html = ''
    var index = 0
    var lastIndex = 0

    for (index = match.index; index < str.length; index++) {
        switch (str.charCodeAt(index)) {
            case 34: // "
                escape = '&quot;'
                break
            case 38: // &
                escape = '&amp;'
                break
            case 39: // '
                escape = '&#39;'
                break
            case 60: // <
                escape = '&lt;'
                break
            case 62: // >
                escape = '&gt;'
                break
            default:
                continue
        }

        if (lastIndex !== index) {
            html += str.substring(lastIndex, index)
        }

        lastIndex = index + 1
        html += escape
    }

    return lastIndex !== index
        ? html + str.substring(lastIndex, index)
        : html
}

export const LoadingOverlay = () => {
    return (
        <div className="d-flex h-100 w-100 justify-content-center align-items-center">
            <CircularProgress color="secondary" />
        </div>
    );
}

export const HelpButton = ({ to, style, ...other }) => <HelpOutlineIcon color="disabled" style={{ cursor: 'pointer', ...style, fontSize: 20 }} onClick={() => window.open(to, "_blank")} {...other} />

export const HelpButtonWithText = ({ title, to, style, className, ...other }) => <a className={`${className} d-flex align-items-center`} href={to} target="_blank" rel="noopener noreferrer" {...other}><HelpButton to={to} className="mr-2" />{title}</a>

export const InfoPage = ({children}) => {
    return (
        <div className="infoPageRoot">
            <div className="infoPageCardRoot">
                {children}
            </div>
        </div>
    )
}

export const dayjsUTC = () => dayjs.utc();

export const PaymentTierStatus = ({ billingPeriodTotal }) => {

    const theme = useTheme();

    const nextToTotalView = {
        width: 24,
        marginLeft: 8,
        display: 'flex'
    };

    const CustomTooltip = withStyles({ tooltip: { maxWidth: 200 } })(Tooltip);
    const GreenCheckCircleIcon = withStyles({ root: { color: theme.palette.success.main } })(CheckCircleIcon);

    if (billingPeriodTotal === false)
        return (
            <div style={nextToTotalView}><CircularProgress color="primary" size={20} /></div>
        )
    else
        return (
            <Zoom in>
                <div className="d-flex align-items-center" style={nextToTotalView}>
                    { billingPeriodTotal > FREE_TIER_LIMIT ?
                    <>
                        <ClearIcon />
                    </>
                    :
                    <CustomTooltip arrow title="You are within the free $10 quota for this month. No payment is required until exceeding $10, including 'Storage' cost." placement="right">
                        <GreenCheckCircleIcon />
                    </CustomTooltip> }
                </div>
            </Zoom>
        )
}