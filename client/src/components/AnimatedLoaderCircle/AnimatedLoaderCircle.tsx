import classes from './AnimatedLoaderCircle.module.css';

interface AnimatedLoaderCircleProps {
    size: string,
    borderWidth: string,
}

export default function AnimatedLoaderCircle({size, borderWidth}: AnimatedLoaderCircleProps) {
    return (
        <div style={{height: size, width: size, borderWidth: borderWidth}} className={classes.animatedLoader} />
    )
}