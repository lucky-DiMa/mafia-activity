import classes from './FullScreenLoader.module.css'
import AnimatedLoaderCircle from "../AnimatedLoaderCircle/AnimatedLoaderCircle.tsx";

interface FullScreenLoaderProps {
    message: string
}

export default function FullScreenLoader(props: FullScreenLoaderProps) {
    return (
        <div className={classes.loader}>
            <AnimatedLoaderCircle size={"20vh"} borderWidth={"2vh"}/>
            <p>{props.message}</p>
        </div>
    )
}