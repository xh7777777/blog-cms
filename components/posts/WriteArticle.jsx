import React, {useState} from 'react'
import "vditor/dist/index.css";
import Vditor from "vditor";

function WriteArticle({vd, setVd, value = ''}) {
    React.useEffect(() => {
      const vditor = new Vditor("vditor", {
        minHeight: 400,
        toolbar: [
          'headings',
          'bold',
          'italic',
          'strike',
          '|',
          'line',
          'quoprote',
          'list',
          'ordered-list',
          'check',
          'outdent',
          'indent',
          'quote',
          'code',
          'inline-code',
          'undo',
          'redo',
          {
            name: 'upload',
            tip: '上传图片',
          },
          'link',
          'table',
          'both',
          'outline',
          'export',
          'br',
        ],
        upload: {
          url: 'http://localhost:3000/article/upload',
          multiple: false,
          accept: 'image/*',
          fieldName: 'file',
          success(_, res) {
            vditor.insertValue(
              `![${JSON.parse(res).data.name}](${JSON.parse(res).data.url})`,
            );
          },
        },
        after: () => {
          setVd(vditor)
          vditor.setValue(value)
        }
      });
    }, []);
    return <div id="vditor" className="vditor"/>;
}

export default WriteArticle