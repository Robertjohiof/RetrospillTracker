import {ReactNode} from "react";
import IntrinsicElements = React.JSX.IntrinsicElements;

//TODO: refactor and move to a more suitable place
interface HeadingProps {
    level: 1 | 2 | 3 | 4 | 5;
    children: ReactNode;
    styling?: string;
}

//TODO: refactor and move to a more suitable place and make styling more dynamic
const headingBaseStyle = {
    1: "text-3xl font-extrabold text-tertiary ",
    2: "text-lg font-extrabold text-iceblue ",
    3: "text-md font-bold text-iceblue ",
    4: "text-sm font-semibold text-iceblue ",
    5: "text-sm font-medium text-iceblue ",
}
/**
 * General purpose heading component for keeping the styling of headings consistent and maintainable
 * @param {HeadingProps} props The level, content and extra classes of the heading
 */
export default function Heading( props: HeadingProps ){
    const { level, children, styling } = props;
    const HeadingWithLevel = `h${level}` as keyof IntrinsicElements
    const stylingClasses = `${headingBaseStyle[level]} ${styling}`

    return (
        <HeadingWithLevel className={stylingClasses}>{children}</HeadingWithLevel>
    )
}