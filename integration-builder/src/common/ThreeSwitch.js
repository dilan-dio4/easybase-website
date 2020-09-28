import * as React from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import capitalize from 'lodash/capitalize';
import useFormControl from '@material-ui/core/FormControl/useFormControl';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';

export const threeSwitchStyles = (theme) => ({
    /* Styles applied to the root element. */
    root: {
        display: 'inline-flex',
        width: 34 + 12 * 3,
        height: 14 + 12 * 2,
        overflow: 'hidden',
        padding: 12,
        boxSizing: 'border-box',
        position: 'relative',
        flexShrink: 0,
        zIndex: 0, // Reset the stacking context.
        verticalAlign: 'middle', // For correct alignment with the text.
        '@media print': {
            colorAdjust: 'exact',
        },
    },
    /* Styles applied to the internal `SwitchBase` component's `root` class. */
    switchBase: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1, // Render above the focus ripple.
        color: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[400],
        transition: theme.transitions.create(['left', 'transform'], {
            duration: theme.transitions.duration.shortest,
        }),
        '&$checked': {
            transform: 'translateX(32px)',
        },
        '&$nulled': {
            transform: 'translateX(16px)',
        },
        '&$disabled': {
            color: theme.palette.type === 'light' ? theme.palette.grey[400] : theme.palette.grey[800],
        },
        '&$checked + $track': {
            opacity: 0.5,
        },
        '&$disabled + $track': {
            opacity: theme.palette.type === 'light' ? 0.12 : 0.1,
        },
    },
    /* Styles applied to the internal SwitchBase component's root element if `color="primary"`. */
    colorPrimary: {
        '&$checked': {
            color: theme.palette.primary.main,
            '&:hover': {
                backgroundColor: fade(theme.palette.primary.main, theme.palette.action.hoverOpacity),
                '@media (hover: none)': {
                    backgroundColor: 'transparent',
                },
            },
        },
        '&$disabled': {
            color: theme.palette.type === 'light' ? theme.palette.grey[400] : theme.palette.grey[800],
        },
        '&$nulled': {
            color: theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[800],
        },
        '&$checked + $track': {
            backgroundColor: theme.palette.primary.main,
        },
        '&$disabled + $track': {
            backgroundColor:
                theme.palette.type === 'light' ? theme.palette.common.black : theme.palette.common.white,
        },
        '&$nulled + $track': {
            backgroundColor: theme.palette.common.white,
        },
    },
    /* Styles applied to the internal SwitchBase component's root element if `color="secondary"`. */
    colorSecondary: {
        '&$checked': {
            color: theme.palette.secondary.main,
            '&:hover': {
                backgroundColor: fade(theme.palette.secondary.main, theme.palette.action.hoverOpacity),
                '@media (hover: none)': {
                    backgroundColor: 'transparent',
                },
            },
        },
        '&$disabled': {
            color: theme.palette.type === 'light' ? theme.palette.grey[400] : theme.palette.grey[800],
        },
        '&$nulled': {
            color: theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[800],
        },
        '&$checked + $track': {
            backgroundColor: theme.palette.secondary.main,
        },
        '&$disabled + $track': {
            backgroundColor:
                theme.palette.type === 'light' ? theme.palette.common.black : theme.palette.common.white,
        },
        '&$nulled + $track': {
            backgroundColor: '#777',
        },
    },
    /* Styles applied to the root element if `size="small"`. */
    sizeSmall: {
        width: 50,
        height: 24,
        padding: 7,
        '& $thumb': {
            width: 16,
            height: 16,
        },
        '& $switchBase': {
            padding: 4,
            '&$checked': {
                transform: 'translateX(26px)',
            },
            '&$nulled': {
                transform: 'translateX(13px)',
            },
        },
    },
    /* Pseudo-class applied to the internal `SwitchBase` component's `checked` class. */
    checked: {},
    /* Pseudo-class applied to the internal SwitchBase component's disabled class. */
    disabled: {},
    /* Pseudo-class applied to the internal SwitchBase component's nulled class. */
    nulled: {},
    /* Styles applied to the internal SwitchBase component's input element. */
    input: {
        left: '-100%',
        width: '300%',
    },
    /* Styles used to create the thumb passed to the internal `SwitchBase` component `icon` prop. */
    thumb: {
        boxShadow: theme.shadows[1],
        backgroundColor: 'currentColor',
        width: 20,
        height: 20,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    /* Styles applied to the track element. */
    track: {
        height: '100%',
        width: '100%',
        borderRadius: 14 / 2,
        zIndex: -1,
        transition: theme.transitions.create(['opacity', 'background-color'], {
            duration: theme.transitions.duration.shortest,
        }),
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.common.black : theme.palette.common.white,
        opacity: theme.palette.type === 'light' ? 0.44 : 0.36,
    },
    slashIcon: {
        color: theme.palette.type === 'light' ? '#757575e8' : theme.palette.common.white,
        fontSize: 20
    },
    slashIconSmall : {
        color: theme.palette.type === 'light' ? '#757575e8' : theme.palette.common.white,
        fontSize: 14
    }
});

const threeSwitchBaseStyles = {
    root: {
        padding: 9,
    },
    checked: {},
    disabled: {},
    input: {
        cursor: 'inherit',
        position: 'absolute',
        opacity: 0,
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        margin: 0,
        padding: 0,
        zIndex: 1,
    },
}

const ThreeSwitchBase = withStyles(threeSwitchBaseStyles, { name: 'PrivateThreeSwitchBase' })(React.forwardRef(function SwitchBase(props, ref) {
    const {
        autoFocus,
        checkedIcon,
        classes,
        className,
        disabled: disabledProp,
        Icon,
        NullIcon,
        id,
        inputProps,
        inputRef,
        name,
        onBlur,
        onChange,
        onFocus,
        readOnly,
        required,
        tabIndex,
        type,
        value,
        ...other
    } = props;

    const muiFormControl = useFormControl();

    const handleFocus = (event) => {
        if (onFocus) {
            onFocus(event);
        }

        if (muiFormControl && muiFormControl.onFocus) {
            muiFormControl.onFocus(event);
        }
    };

    const handleBlur = (event) => {
        if (onBlur) {
            onBlur(event);
        }

        if (muiFormControl && muiFormControl.onBlur) {
            muiFormControl.onBlur(event);
        }
    };

    const handleInputChange = (event) => {
        let newChecked = null;
        if (value === false) newChecked = null;
        else if (value === null) newChecked = true;
        else if (value === true) newChecked = false

        if (onChange) {
            onChange(event, newChecked);
        }
    };

    let disabled = disabledProp;

    if (muiFormControl) {
        if (typeof disabled === 'undefined') {
            disabled = muiFormControl.disabled;
        }
    }

    const hasLabelFor = type === 'checkbox' || type === 'radio';

    return (
        <IconButton
            component="span"
            className={clsx(
                classes.root,
                {
                    [classes.checked]: value === true,
                    [classes.nulled]: value === null,
                    [classes.disabled]: disabled,
                },
                className,
            )}
            disabled={disabled}
            tabIndex={null}
            role={undefined}
            onFocus={handleFocus}
            onBlur={handleBlur}
            ref={ref}
            {...other}
        >
            <input
                autoFocus={autoFocus}
                checked={value}
                className={classes.input}
                disabled={disabled}
                id={hasLabelFor && id}
                name={name}
                onChange={handleInputChange}
                readOnly={readOnly}
                ref={inputRef}
                required={required}
                tabIndex={tabIndex}
                type={type}
                value={value}
                {...inputProps}
            />
            {value === null ? NullIcon : Icon}
        </IconButton>
    );
}));


const ThreeSwitch = React.forwardRef(function Switch(props, ref) {
    const {
        classes,
        className,
        color = 'secondary',
        size = 'medium',
        ...other
    } = props;

    const Icon = <span className={classes.thumb} />;
    const NullIcon = <span className={classes.thumb}><RemoveIcon className={capitalize(size) === 'Small' ? classes.slashIconSmall : classes.slashIcon} /></span>

    return (
        <span
            className={clsx(
                classes.root,
                {
                    [classes[`size${capitalize(size)}`]]: size !== 'medium',
                },
                className,
            )}
        >
            <ThreeSwitchBase
                type="checkbox"
                Icon={Icon}
                NullIcon={NullIcon}
                classes={{
                    root: clsx(classes.switchBase, classes[`color${capitalize(color)}`]),
                    input: classes.input,
                    checked: classes.checked,
                    disabled: classes.disabled,
                    nulled: classes.nulled
                }}
                ref={ref}
                {...other}
            />
            <span className={classes.track} />
        </span>
    );
});

export default withStyles(threeSwitchStyles, { name: 'ThreeSwitch' })(ThreeSwitch);