import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import classes from './index.module.scss'
export default function MdRender({ content }) {
  return (
    <ReactMarkdown
      remarkPlugins={[gfm]}
      className={classes.md}
      children={content}
    />
  );
}
