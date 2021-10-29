const response = (res, statusCode, message) => {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(message));
}

const getRequestBody = async(req) => {
    const buffers = [];
    
    for await (const chunk of req) {
        buffers.push(chunk);
    }

    const data = Buffer.concat(buffers).toString()
    const result = JSON.parse(data)
    return result
}

module.exports = { response, getRequestBody }