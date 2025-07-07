import classes from "./Avatar.module.css"

interface AvatarProps {
    user_id: string,
    className?: string,
    avatar?: string | null,
    isTalking?: boolean
}

export default function Avatar({className, user_id, avatar, isTalking = false}: AvatarProps) {
    let avatarSrc = '';
    if (avatar) {
        avatarSrc = `https://cdn.discordapp.com/avatars/${user_id}/${avatar}`;
    } else {
        const defaultAvatarIndex = (BigInt(user_id) >> 22n) % 6n;
        avatarSrc = `https://cdn.discordapp.com/embed/avatars/${defaultAvatarIndex}.png`
    }
    return (
        <img src={avatarSrc} className={`${className} ${classes.avatar + (isTalking ? ` ${classes.talking}` : '')}`} alt={avatarSrc}/>
    )
}