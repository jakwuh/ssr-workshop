import { renderToNodeStream } from 'react-dom/server';
import { Readable } from 'stream';
import fetchDataFromTree from '../../helpers/getDataFromTree';

const docType = '<!doctype html>';

class DocumentStream extends Readable {

    constructor(document) {
        super();

        this.push(docType);

        fetchDataFromTree(document).then(() => new Promise((resolve, reject) => {
            const stream = renderToNodeStream(document);

            stream.on('data', chunk => this.push(chunk));
            stream.on('end', resolve);
            stream.on('error', reject);
        })).then(
            () => {
                this.push(null);
            }, () => {
                this.push('<script src="/save-me.js"></script>');
                this.push(null);
            });
    }

    _read () {
    }
}

export default DocumentStream;
