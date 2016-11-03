import React from 'react';
import pure from 'recompose/pure';
import { css } from 'aphrodite/no-important';
import Paper from 'material-ui/Paper';
import { portal } from 'configs';
import theme from 'configs/theme';
import Icon from '../Icons';
import { amountsShape } from '../../PropTypes';
import classes from './classes';

const STYLES = {
  icon: {
    width: 40,
    height: 40,
  },
};

const AMOUNT_TYPES_AVAILABILITY = {
  vehicles: true,
  devices: portal === 'tajo',
  dead: true,
  delayed: true,
};

function countAvailableTypes() {
  return Object.values(AMOUNT_TYPES_AVAILABILITY).filter(v => v).length;
}

const AVAILABLE_TYPES_COUNT = countAvailableTypes();

const Amount = ({
  amount,
  helpText,
  icon,
  fullwidth = false,
}) => {
  const paperClassName = css(
    classes.amount,
    fullwidth && classes.amount_fullwidth
  );

  return (
    <Paper className={paperClassName}>
      <div className={css(classes.amount__inn)}>
        <div className={css(classes.amount__icon)}>
          { React.cloneElement(icon, {
            style: STYLES.icon,
          }) }
        </div>
        <div className={css(classes.amount__col)}>
          <div className={css(classes.amount__title)}>
            { amount }
          </div>
          <div className={css(classes.amount__help)}>
            { helpText }
          </div>
        </div>
      </div>
    </Paper>
  );
};

Amount.propTypes = {
  amount: React.PropTypes.number.isRequired,
  helpText: React.PropTypes.string.isRequired,
  icon: React.PropTypes.node.isRequired,

  // will took full width of the parent if true
  fullwidth: React.PropTypes.bool,
};

const FullSummary = ({
  amounts,
}) => (
  <div className={css(classes.fullSummary)}>
    <Amount
      icon={<Icon.CarIcon color={theme.palette.primary3Color} />}
      amount={amounts.vehiclesAmount}
      helpText="vehicles in fleet"
    />
    { AMOUNT_TYPES_AVAILABILITY.devices &&
      <Amount
        icon={<Icon.DeviceIcon color={theme.palette.primary3Color} />}
        amount={amounts.devicesAmount}
        helpText="devices in fleet"
      />
    }
    <Amount
      icon={<Icon.NotReportedIcon color={theme.palette.accent2Color} />}
      amount={amounts.deadAmount}
      helpText="vehicles never reported"
    />
    <Amount
      icon={<Icon.DelayedIcon color={theme.palette.accent2Color} />}
      amount={amounts.delayedAmount}
      helpText="vehicles sending delayed messages"
      fullwidth={AVAILABLE_TYPES_COUNT % 2 !== 0}
    />
  </div>
);

FullSummary.propTypes = {
  amounts: amountsShape.isRequired,
};

export default pure(FullSummary);