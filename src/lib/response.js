function sendResponse(res, data, err){
    res.json({
      "status": {
        "code": res.statusCode,
        "message": res.statusMessage
      },"data": data,
    });
}

module.exports = sendResponse;
  
