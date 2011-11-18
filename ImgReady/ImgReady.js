/**
 * @fileoverview Function scope class module, containing a imagine caching Utility.
 * @Author Christopher Massey
 * @preserve Copyright 2011 Christopher Massey.
 *     See LICENCE for details.
 */

var ImgReady = (function create() 
    {
    /**
      @lends ImgReady.prototype
    */

    
    /**
     * Class for caching and status of image resources being loaded.
     * @constructor
     */
    function ImgReady() 
    {
    
        this.imageArray = new Array();
        this.loadCount = 0;
        this.compPointer = undefined;
    }
    
    /**
     * Method allows for a png image file to be cached in this instance of ImgReady 
     *     and returns a reference of the specfic image that was just cached.
     * @parameter {string} url This parameter receives a relative uniform resource locator.
     *    Example: "images/rocket.png"
     * @returns {Image} Returns reference of image instance.
     */
    ImgReady.prototype.addImage = function(url) 
    {
        var locate = 0;
        
        locate = this.imageArray.push(new Image())
        this.imageArray[locate - 1].loadStat = false;
        //Once the image has loaded run function to change load status.
        this.imageArray[locate - 1].onload = this._imageLoaded(locate - 1);
        this.imageArray[locate - 1].src = url;
        
        
        return this.imageArray[locate - 1];
    };
    
    /**
     * Private Method is for changing the status of the received Image 
           and running an external function, if implemented
     * @parameter {Image} locat This is a reference to an Image instance with an 
     *     extra boolean property: loadStat.
     */
    ImgReady.prototype._imageLoaded = function(locat)
    {
        this.loadCount++;
        this.imageArray[locat].loadStat = true;
        if (typeof this.compPointer == "function")
            {
                this.compPointer();
            }
    };
    
    /**
     * Method for storing an external function reference.
     * @parameter {function} External function, no parameters need. 
     */
    ImgReady.prototype.setCompFunction = function(func)
    {
        this.compPointer = func
    };
    
    /**
     * Method for showing the percentage of images loaded.
     * @return {integer} 0 to 100 percentage.
     */
    ImgReady.prototype.getPercent = function()
    {
        var count = this.loadCount;
        var len = this.imageArray.length;
    
        if (count == len)
        {
            return 100;
        }
        else
        {
            return Math.floor(count / len * 100);
        }
    };
    
    /**
     * Method for accessing the image instance for debugging purposes.
     * @return {Array.<Image>} direct access to the image cache.
     */
    ImgReady.prototype.debugStatus = function()
    {
        return this.imageArray;
    };
    
    return ImgReady;
    
}());

    

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
    
    imgStor = new ImgReady();
     
    enterpriseImg = imgStor.addImage("images/enterprise.png");
    rocketImg = imgStor.addImage("images/rocket.png");
    pikeImg = imgStor.addImage("images/pike.png");
    spockImg = imgStor.addImage("images/spock.png");
    serenityImg = imgStor.addImage("images/serenity.png");
    
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
