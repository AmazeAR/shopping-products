function sendResponse(res, data, err){
    res.json({
      "status": {
        "code": res.statusCode,
        "message": res.statusMessage
      }
    });
}

module.exports = sendResponse;
  
