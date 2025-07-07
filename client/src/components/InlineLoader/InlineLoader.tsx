import classes from './InlineLoader.module.css'
import AnimatedLoaderCircle from "../AnimatedLoaderCircle/AnimatedLoaderCircle.tsx";

interface InlineLoaderProps {
    message: string
}

export default function InlineLoader(props: InlineLoaderProps) {
    return (
        <div className={classes.loader}>
            <AnimatedLoaderCircle size={"5vh"} borderWidth={"0.5vh"}/>
            <p>{props.message}</p>
        </div>
    )
}