class SerialBuffer{
    constructor(onLine, delimiter = '\n'){
        this.buffer = '';
        this.onLine = onLine;
        this.delimiter = delimiter;
    }

    push(chunk){
        this.buffer += chunk.toString('utf8');

        let delimiterIndex;

        while ((delimiterIndex = this.buffer.indexOf(this.delimiter)) !== -1){
            const line = this.buffer.slice(0, delimiterIndex).trim();
            this.buffer = this.buffer.slice(delimiterIndex + this.delimiter.length);

            if (line.length > 0){
                this.onLine(line);
            }
        }
    }
}

module.exports = {SerialBuffer};