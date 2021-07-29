import { makeStyles } from '@material-ui/core/styles';
import { animated, config, useSpring } from 'react-spring';

const useStyles = makeStyles((theme) => ({
  number: {
    ...theme.typography.h4,
  },
}));

interface AnimatedNumberProps {
  value: number;
}

const AnimatedNumber = ({ value }: AnimatedNumberProps) => {
  const classes = useStyles();

  const { number } = useSpring({
    reset: true,
    from: { number: 0 },
    number: value,
    delay: 200,
    config: config.molasses,
  });
  return (
    <animated.div className={classes.number}>
      {number.to((n) => n.toFixed(0))}
    </animated.div>
  );
};

export default AnimatedNumber;
