import { Document, Page, pdfjs } from 'react-pdf';
import { useState } from 'react';
import './styles.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


const openFile = async () => {
  const pickerOpts = {
    types: [
      {
        description: 'pdf',
        accept: {
          'application/pdf': ['.pdf']
        }
      },
    ],
    excludeAcceptAllOption: true,
    multiple: true
  };

  try {
    const handles = await window.showOpenFilePicker(pickerOpts);
    const promises = handles.map(async handle => {
      const file = await handle.getFile();
      return file;
    });

    const files = await Promise.all(promises);
    return files;

  } catch (err) {
    console.error(err.name, err.message);
  }
};

export default function App() {

  const [pdfsToRender, setPdfsToRender] = useState(null);
  const onClickHandler = async () => {
    const selectedPdfs = await openFile();
    setPdfsToRender(selectedPdfs);
  };

  return (
    <div className="App">
      <button onClick={onClickHandler}>Upload pdf</button>
      {
        pdfsToRender &&
        pdfsToRender.map((pdf) => (
          <Document file={pdf}>
            <Page pageNumber={1} height={200} width={200} />
          </Document>
        ))
      }
    </div>
  );
}
