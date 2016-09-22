/**
 * Created by Dalton on 4/20/2016.
 */

//When we receive a message with the number of iterations we want to perform,
//we do the main work of the monte carlo approx.
onmessage = function(e)
{
    console.log("worker received message " + e);
    var iterations = e.data;
    var circleCount = 0;
    for (var i = 0; i < iterations; i++)
    {
        var x = Math.random();//Random Double
        var y = Math.random();//Random Double
        if ((x * x + y * y) < 1) 
        {
            ++circleCount;
        }
    }
    var reply = {};
    reply.result = circleCount;

    postMessage(reply);
};