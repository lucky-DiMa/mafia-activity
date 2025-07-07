import classes from './InlineErrorComponent.module.css'

interface FullScreenErrorComponentProps {
    message: string
}

export default function InlineErrorComponent(props: FullScreenErrorComponentProps) {
    return (
        <div className={classes.error}>
            <p>{props.message}</p>
        </div>
    )
}