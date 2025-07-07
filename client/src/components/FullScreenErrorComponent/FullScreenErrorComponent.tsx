import classes from './FullScreenErrorComponent.module.css'

interface FullScreenErrorComponentProps {
    message: string
}

export default function FullScreenErrorComponent(props: FullScreenErrorComponentProps) {
    return (
        <div className={classes.error}>
            <p>{props.message}</p>
        </div>
    )
}