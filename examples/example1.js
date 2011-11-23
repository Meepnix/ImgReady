/**
 * @fileoverview Function, containing example code how to intialise and use ImgReady.
 * @Author Christopher Massey
 * @preserve Copyright 2011 Christopher Massey.
 *     See LICENCE for details.
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
    
    //Cache images
    enterpriseImg = imgStor.addImage("images/enterprise.png");
    rocketImg = imgStor.addImage("images/rocket.png");
    pikeImg = imgStor.addImage("images/pike.png");
    spockImg = imgStor.addImage("images/spock.png");
    serenityImg = imgStor.addImage("images/serenity.png");
    
    
    /**
    *
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
    
    var start = function()
    {
    
        //clear();
        context.drawImage(rocketImg, 50, 50);
        context.drawImage(pikeImg, 100, 100);
   
    };
    
    var clear = function()
    {
        context.clearRect(0, 0, width, height);
    };
    
    
    interLoad = setInterval(loading, 20)
    
    
    
    
    
}


//Engage!!!

window.onload = function(){
	
    
    render();
    

    
	
    
};
