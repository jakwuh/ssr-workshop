import { renderToNodeStream } from 'react-dom/server';
import { Readable } from 'stream';
import fetchDataFromTree from '../../helpers/getDataFromTree';

const docType = '<!doctype html>';

class DocumentStream extends Readable {

    constructor(document) {
        super();

        this.push(docType);

        fetchDataFromTree(document).then(() => {
            const stream = renderToNodeStream(document);

            stream.on('data', chunk => this.push(chunk));
            stream.on('end', () => this.push(null));
        });
    }

    _read () {
    }
}

export default DocumentStream;
