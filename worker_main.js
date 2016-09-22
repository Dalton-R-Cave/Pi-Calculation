/**
 * Created by Dalton on 4/20/2016.
 */

function makePromises()
{
    var numWorkers = 10;
    var promises = new Array();
    for (var i = 0; i < numWorkers; i++)
    {
        //Each promise made sends out one worker
        promises.push(new Promise(function(resolve, reject){
            console.log("Creating promise for calculation " + i);
            var myWorker = new Worker("worker.js");
            var numIterations = 1000000;

            console.log("posting message to worker");
            myWorker.postMessage(numIterations);

            //When we receive the reply from the worker we call the promises 'resolve' function
            myWorker.onmessage=function(e)
            {
                console.log("received message " + e.data.result);
                //document.getElementById("result").innerHTML = e.data.result;
                resolve(e.data.result);
            };
        }));
    }

    //Wait for all promises to complete, then compute the results of the approximation
    Promise.all(promises).then(function(values){
        var total = 0.0;
        values.forEach(function(value){
            console.log(value);
            total += value;
        });
        var piApproximation = approximate(total);
        console.log("Pi Approximation: " + piApproximation);
        document.getElementById("result").innerHTML = piApproximation;
    })
}

//Approximate the value of pi given the total of the workers calculations and our iterations/workers numbers
function approximate(total)
{
    console.log("Approximating...");
    return 4.0 * total / 1000000 / 10;
}

//Set up when page loads
function main()
{
    if (window.Worker)
    {
        //If workers are allowed, make some promises that send out these workers
        document.getElementById("startButton").onclick = makePromises;
    }
    else
    {
        console.log("WebWorker not supported");
    }
}