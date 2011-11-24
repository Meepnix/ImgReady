/**
 * @fileoverview Function, containing example code how to intialise and use ImgReady.
 * @Author Christopher Massey
 * @preserve Copyright 2011 Christopher Massey.
 *     See LICENCE for details.
 */

/** Function that implements a canvas and its resources.
 */
function render()
{
     
    //Setting up canvas
    
    var canvas = document.getElementById('c');
    var context = canvas.getContext('2d');
    
    var interLoad;
    
    //Set Canvas size
    var width = 1000;
    var height = 500;
    
    var percent = 0;
    
    canvas.width = width; 
    canvas.height = height;
    
    //Setup ImgReady class from ImgReady Module
    imgStor = new ImgReady();
    
    //Cache resources
    boomAud = imgStor.addAudio("sounds/boom.ogg");
    pewAud = imgStor.addAudio9"sounds/pew.ogg");
    rocketImg = imgStor.addImage("images/rocket.png");
    pikeImg = imgStor.addImage("images/pike.png");
    
    //Every second checks the status of resources loading
    interLoad = setInterval(loading, 1000)
    
    
    /** Function Closure that renders resource load status and runs the main render 
    *    once all the resources have loaded.
    */
    var loading = function()
    {
        percent = imgStor.getPercent();
        
        clear();
        context.fillStyle = "black";
        context.font = "20px sans-serif";
        context.fillText( "loading "+percent+" %", 300, 300 );
        
        
        if (percent == 100)
        {
            clearInterval(interLoad);
            start();
        }
        
        
    };
    
    /** Function Closure that runs the successfully cached resources.
     */
    var start = function()
    {
    
        //Play sounds
        boomAud.play();
        pewAud.play();
        //Render images
        context.drawImage(rocketImg, 50, 50);
        context.drawImage(pikeImg, 100, 100);
   
    };
    
    /** Function Closure that clears the canvas.
     */
    var clear = function()
    {
        context.clearRect(0, 0, width, height);
    };
        
}


//Engage!!!

window.onload = function(){
	
    render();
    
};
