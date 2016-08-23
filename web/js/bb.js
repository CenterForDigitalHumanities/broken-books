/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var annoID, imageID = 1;
var rangeID = 100;
var canvasTag = 100;
var annoListID = 5;
var currentLeaf = "";
var alpha, beta, zeta = false;
var annoListCollection = new Array(3);
var putInBucketDemo = false;
var thisURL = document.location.href;
var bucketID = "";
var manifest = {};
var manifestID = "";
if(thisURL.indexOf("demo=1") > -1 ){
    putInBucketDemo = true; 
}
var testLists = [
    {
        "@type" : "sc:AnnotationList",
        "context" : "http://www.shared-canvas.org/ns/context.json",
        "on" : "http://www.example.org/iiif/LlangBrev/range/25", //January leaf
        "originalAnnoID" : "",
        "version" : 1,
        "permission" : 0,
        "forkFromID" : "",
        "@id" :"http://www.example.org/iiif/LlangBrev/annoList/3",
        "resources" : "[{\"@id\":\"http://localhost:8080/annotationstore/annotation/554ce6dee4b0f1c678d2a54c\",\"@type\":\"oa:Annotation\",\"motivation\":\"oa:describing\",\"label\":\"General Metadata\",\"resource\":{\"@type\":\"cnt:ContentAsText\",\"cnt:chars\":\"qwertyuuiio\"},\"on\":\"http://www.example.org/iiif/LlangBrev/range/25\"},{\"@id\":\"http://localhost:8080/annotationstore/annotation/554ce6dee4b0f1c678d2a54b\",\"@type\":\"oa:Annotation\",\"motivation\":\"oa:describing\",\"label\":\"Institution or Repository: \",\"resource\":{\"@type\":\"cnt:ContentAsText\",\"cnt:chars\":\"qqqq\"},\"on\":\"http://www.example.org/iiif/LlangBrev/range/25\"},{\"@id\":\"http://localhost:8080/annotationstore/annotation/554ce6dee4b0f1c678d2a54d\",\"@type\":\"oa:Annotation\",\"motivation\":\"oa:describing\",\"label\":\"Date: \",\"resource\":{\"@type\":\"cnt:ContentAsText\",\"cnt:chars\":\"wwww\"},\"on\":\"http://www.example.org/iiif/LlangBrev/range/25\"},{\"@id\":\"http://localhost:8080/annotationstore/annotation/554ce6dee4b0f1c678d2a54e\",\"@type\":\"oa:Annotation\",\"motivation\":\"oa:describing\",\"label\":\"Language:  \",\"resource\":{\"@type\":\"cnt:ContentAsText\",\"cnt:chars\":\"eeee\"},\"on\":\"http://www.example.org/iiif/LlangBrev/range/25\"}]"
    },
    {
        "@type" : "sc:AnnotationList",
        "context" : "http://www.shared-canvas.org/ns/context.json",
        "on" : "http://www.example.org/iiif/LlangBrev/canvas/1", //january leaf canvas 1
        "originalAnnoID" : "",
        "version" : 1,
        "permission" : 0,
        "forkFromID" : "",
        "@id" : "http://www.example.org/iiif/LlangBrev/annoList/1",
        "resources" : "[{\"@id\":\"http://localhost:8080/annotationstore/annotation/554ce6f3e4b0f1c678d2a550\",\"@type\":\"oa:Annotation\",\"motivation\":\"oa:describing\",\"label\":\"Place Of Origin: \",\"resource\":{\"@type\":\"cnt:ContentAsText\",\"cnt:chars\":\"ssss\"},\"on\":\"http://www.example.org/iiif/LlangBrev/canvas/1\"}]"
    },
    {
        "@type" : "sc:AnnotationList",
        "context" : "http://www.shared-canvas.org/ns/context.json",
        "on" : "http://www.example.org/iiif/LlangBrev/canvas/2", //january leaf canvas 2
        "originalAnnoID" : "",
        "version" : 1,
        "permission" : 0,
        "forkFromID" : "",
        "@id" : "http://www.example.org/iiif/LlangBrev/annoList/2",
        "resources" : "[{\"@id\":\"http://localhost:8080/annotationstore/annotation/554ce707e4b0f1c678d2a554\",\"@type\":\"oa:Annotation\",\"motivation\":\"oa:describing\",\"label\":\"Format (single leaf, half bifolium, fragment): \",\"resource\":{\"@type\":\"cnt:ContentAsText\",\"cnt:chars\":\"xxxxx\"},\"on\":\"http://www.example.org/iiif/LlangBrev/canvas/2\"}]"
    }       
];
annoListCollection[0] = testLists[0];
annoListCollection[1] = testLists[1];
annoListCollection[2] = testLists[2];
var serverCanvasID = -1;
var serverAnnoID = -1;
var currentLeafServerID = -1;

var manifestCanvases = [];
var rangeCollection = [];
var allLeaves = [];
var testManifest = {
    "@context" : "http://iiif.io/api/presentation/2/context.json",
    "@id" : "",
    "@type" : "sc:Manifest",
    "context" : "http://www.shared-canvas.org/ns/context.json",
    "label" : "Llang Binder",
    "sequences" : [{
      "@id" : "http://www.example.org/iiif/LlangBrev/sequence/normal",
      "@type" : "sc:Sequence",
      "label" : "Llangattock Bucket",
      "canvases" : [{
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/1_anchor",
          "@type" : "sc:Canvas",
          "label" : "Llang_001",
          "height" : 1000,
          "width" : 667,
          "images" : [{
              "@type" : "oa:Annotation",
              "motivation" : "sc:painting",
              "resource" : {
                "@id" : "http://www.example.org/iiif/LlangBrev/image_001",
                "@type" : "dctypes:Image",
                "format" : "image/jpeg",
                "height" : 2365,
                "width" : 1579
              },
              "on" : "http://www.example.org/iiif/LlangBrev/canvas/1_anchor"
          }],
          "otherContent":[]
         },
         {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/1",
          "@type" : "sc:Canvas",
          "label" : "January Text_r",
          "height" : 300,
          "width" : 200,
          "images" : [
          {
               "@type" : "oa:Annotation",
               "motivation" : "sc:painting",
               "resource" : {
                 "@id" : "http://www.yoyowall.com/wp-content/uploads/2013/03/Abstract-Colourful-Cool.jpg",
                 "@type" : "dctypes:Image",
                 "format" : "image/jpeg",
                 "height" : 2365,
                 "width" : 1579
               },
               "on" : "http://www.example.org/iiif/LlangBrev/canvas/1"
          }
          ],
          "otherContent":[{"@id":"http://www.example.org/iiif/LlangBrev/annoList/1", "@type":"sc:AnnotationList"}]
         
   },
   {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/2",
          "@type" : "sc:Canvas",
          "label" : "January Text_v",
          "height" : 300,
          "width" : 200,
          "images" : [{
              "@type" : "oa:Annotation",
              "motivation" : "sc:painting",
              "resource" : {
                "@id" : "http://funlava.com/wp-content/uploads/2013/03/cool-hd-wallpapers.jpg",
                "@type" : "dctypes:Image",
                "format" : "image/jpeg",
                // "height" : 2365,
                // "width" : 1579
              },
              "on" : "http://www.example.org/iiif/LlangBrev/canvas/2"
          }],
          "otherContent":[{"@id":"http://www.example.org/iiif/LlangBrev/annoList/2", "@type":"sc:AnnotationList"}]
   },
   {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/3",
          "@type" : "sc:Canvas",
          "label" : "February Text_r",
          "height" : 300,
          "width" : 200,
          "images" : [{
              "@type" : "oa:Annotation",
              "motivation" : "sc:painting",
              "resource" : {
                "@id" : "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSRYZAj0K5SiHcZonHG--GrygYLgnjhSXX35BfapUckYLB7fKYI",
                "@type" : "dctypes:Image",
                "format" : "image/jpeg",
                // "height" : 2365,
                // "width" : 1579
              },
              "on" : "http://www.example.org/iiif/LlangBrev/canvas/3"
          }],
          "otherContent":[]
         
   },
   {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/4",
          "@type" : "sc:Canvas",
          "label" : "February Text_v",
          "height" : 300,
          "width" : 200,
          "images" : [{
              "@type" : "oa:Annotation",
              "motivation" : "sc:painting",
              "resource" : {
                "@id" : "http://i.huffpost.com/gen/1719761/images/o-COOL-CAT-facebook.jpg",
                "@type" : "dctypes:Image",
                "format" : "image/jpeg",
                // "height" : 2365,
                // "width" : 1579
              },
              "on" : "http://www.example.org/iiif/LlangBrev/canvas/4"
          }],
          "otherContent":[]
         
   },
   {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/5",
          "@type" : "sc:Canvas",
          "label" : "March Text_r",
          "height" : 300,
          "width" : 200,
          "images" : [{
              "@type" : "oa:Annotation",
              "motivation" : "sc:painting",
              "resource" : {
                "@id" : "http://cloud-4.steamusercontent.com/ugc/43108316458046990/EC4110525593F4CC213E69257ABE6F0BE1D18D9A/",
                "@type" : "dctypes:Image",
                "format" : "image/jpeg",
                // "height" : 2365,
                // "width" : 1579
              },
              "on" : "http://www.example.org/iiif/LlangBrev/canvas/5"
          }],
          "otherContent":[]
         
   },
    {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/6",
          "@type" : "sc:Canvas",
          "label" : "March Text_v",
          "height" : 300,
          "width" : 200,
          "images" : [{
              "@type" : "oa:Annotation",
              "motivation" : "sc:painting",
              "resource" : {
                "@id" : "http://www.hdwallpaperscool.com/wp-content/uploads/2014/06/amazing-backgrounds-cool-wallpapers-of-high-resolution.jpg",
                "@type" : "dctypes:Image",
                "format" : "image/jpeg",
                // "height" : 2365,
                // "width" : 1579
              },
              "on" : "http://www.example.org/iiif/LlangBrev/canvas/6"
          }],
          "otherContent":[]
         
   },
   {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/7",
          "@type" : "sc:Canvas",
          "label" : "April Text_r",
          "height" : 300,
          "width" : 200,
          "images" : [{
              "@type" : "oa:Annotation",
              "motivation" : "sc:painting",
              "resource" : {
                "@id" : "http://t3.gstatic.com/images?q=tbn:ANd9GcR-CUW-EqZ7WboySAFm_3oQH9xLbxZsSHu2EyPsQ8gCObts0-nJ",
                "@type" : "dctypes:Image",
                "format" : "image/jpeg",
                // "height" : 2365,
                // "width" : 1579
              },
              "on" : "http://www.example.org/iiif/LlangBrev/canvas/7"
          }],
          "otherContent":[]
         
   },
   {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/8",
          "@type" : "sc:Canvas",
          "label" : "April Text_v",
          "height" : 300,
          "width" : 200,
          "images" : [{
              "@type" : "oa:Annotation",
              "motivation" : "sc:painting",
              "resource" : {
                "@id" : "http://t1.gstatic.com/images?q=tbn:ANd9GcQM3TBh35_znmOW65GdTY1u6WZCa5smnvv_s1nIJl355iaqIBeVGg",
                "@type" : "dctypes:Image",
                "format" : "image/jpeg",
                // "height" : 2365,
                // "width" : 1579
              },
              "on" : "http://www.example.org/iiif/LlangBrev/canvas/8"
          }],
          "otherContent":[]
         
   },
   {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/9",
          "@type" : "sc:Canvas",
          "label" : "May Text_r",
          "height" : 300,
          "width" : 200,
          "images" : [{
              "@type" : "oa:Annotation",
              "motivation" : "sc:painting",
              "resource" : {
                "@id" : "http://www.darveshtv.com/wp-content/uploads/2015/02/cool_car_3d_wallpapers_hot.jpg",
                "@type" : "dctypes:Image",
                "format" : "image/jpeg",
                // "height" : 2365,
                // "width" : 1579
              },
              "on" : "http://www.example.org/iiif/LlangBrev/canvas/9"
          }],
          "otherContent":[]
         
   },
   {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/10",
          "@type" : "sc:Canvas",
          "label" : "May Text_v",
          "height" : 300,
          "width" : 200,
          "images" : [{
              "@type" : "oa:Annotation",
              "motivation" : "sc:painting",
              "resource" : {
                "@id" : "http://ajournalofmusicalthings.com/wp-content/uploads/Cool.jpg",
                "@type" : "dctypes:Image",
                "format" : "image/jpeg",
                // "height" : 2365,
                // "width" : 1579
              },
              "on" : "http://www.example.org/iiif/LlangBrev/canvas/10"
          }],
          "otherContent":[]
         
   },
   {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/11",
          "@type" : "sc:Canvas",
          "label" : "June Text_r",
          "height" : 300,
          "width" : 200,
          "images" : [{
              "@type" : "oa:Annotation",
              "motivation" : "sc:painting",
              "resource" : {
                "@id" : "http://upload.wikimedia.org/wikipedia/commons/2/20/Cool,_Calif_sign.jpg",
                "@type" : "dctypes:Image",
                "format" : "image/jpeg",
                // "height" : 2365,
                // "width" : 1579
              },
              "on" : "http://www.example.org/iiif/LlangBrev/canvas/11"
          }],
          "otherContent":[]
         
   },
   {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/12",
          "@type" : "sc:Canvas",
          "label" : "June Text_v",
          "height" : 300,
          "width" : 200,
          "images" : [{
              "@type" : "oa:Annotation",
              "motivation" : "sc:painting",
              "resource" : {
                "@id" : "http://t1.gstatic.com/images?q=tbn:ANd9GcT_cVgwB1vOupPsjjiGbnPrkK24fpq9BThi3fkVNrgoX0oMNwzv0w",
                "@type" : "dctypes:Image",
                "format" : "image/jpeg",
                // "height" : 2365,
                // "width" : 1579
              },
              "on" : "http://www.example.org/iiif/LlangBrev/canvas/12"
          }],
          "otherContent":[]
   },
   {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/13",
          "@type" : "sc:Canvas",
          "label" : "Advent_r",
          "height" : 300,
          "width" : 200,
          "images" : [{
              "@type" : "oa:Annotation",
              "motivation" : "sc:painting",
              "resource" : {
                "@id" : "http://t0.gstatic.com/images?q=tbn:ANd9GcTLM1VY3Ehp3F1hd78mrszS3euO32XV-BjtgXaaKNcRJ8je3ECmZg",
                "@type" : "dctypes:Image",
                "format" : "image/jpeg",
                // "height" : 2365,
                // "width" : 1579
              },
              "on" : "http://www.example.org/iiif/LlangBrev/canvas/13"
          }],
          "otherContent":[]      
   },
   {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/14",
          "@type" : "sc:Canvas",
          "label" : "Advent_v",
          "height" : 300,
          "width" : 200,
          "images" : [{
              "@type" : "oa:Annotation",
              "motivation" : "sc:painting",
              "resource" : {
                "@id" : "http://browsewallpaper.com/wp-content/uploads/2014/11/cool%20designs%20wallpaper-cKAa.jpg",
                "@type" : "dctypes:Image",
                "format" : "image/jpeg",
                // "height" : 2365,
                // "width" : 1579
              },
              "on" : "http://www.example.org/iiif/LlangBrev/canvas/14"
          }],
          "otherContent":[]
         
   },
   {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/15",
          "@type" : "sc:Canvas",
          "label" : "Epiphany_r",
          "height" : 300,
          "width" : 200,
          "images" : [{
              "@type" : "oa:Annotation",
              "motivation" : "sc:painting",
              "resource" : {
                "@id" : "http://www.desktopaper.com/wp-content/uploads/great-cool-design-backgrounds.jpg",
                "@type" : "dctypes:Image",
                "format" : "image/jpeg",
                // "height" : 2365,
                // "width" : 1579
              },
              "on" : "http://www.example.org/iiif/LlangBrev/canvas/15"
          }],
          "otherContent":[]   
   },
   {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/16",
          "@type" : "sc:Canvas",
          "label" : "Epiphany_v",
          "height" : 300,
          "width" : 200,
          "images" : [{
              "@type" : "oa:Annotation",
              "motivation" : "sc:painting",
              "resource" : {
                "@id" : "http://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Haliaeetus_leucocephalus_-Skagit_valley-8-2c.jpg/300px-Haliaeetus_leucocephalus_-Skagit_valley-8-2c.jpg",
                "@type" : "dctypes:Image",
                "format" : "image/jpeg",
                // "height" : 2365,
                // "width" : 1579
              },
              "on" : "http://www.example.org/iiif/LlangBrev/canvas/16"
          }],
          "otherContent":[]
         
   },
   {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/17",
          "@type" : "sc:Canvas",
          "label" : "Pre-Lent_r",
          "height" : 300,
          "width" : 200,
          "images" : [{
              "@type" : "oa:Annotation",
              "motivation" : "sc:painting",
              "resource" : {
                "@id" : "http://www.chicagonow.com/greenamajigger/files/2013/04/bee-eater_1627477i.jpg",
                "@type" : "dctypes:Image",
                "format" : "image/jpeg",
                // "height" : 2365,
                // "width" : 1579
              },
              "on" : "http://www.example.org/iiif/LlangBrev/canvas/17"
          }],
          "otherContent":[]   
   },
   {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/18",
          "@type" : "sc:Canvas",
          "label" : "Pre-Lent_v",
          "height" : 300,
          "width" : 200,
          "images" : [{
              "@type" : "oa:Annotation",
              "motivation" : "sc:painting",
              "resource" : {
                "@id" : "http://www.arizonafoothillsmagazine.com/images/stories/aug13/Butterfly_Blue.jpg",
                "@type" : "dctypes:Image",
                "format" : "image/jpeg",
                // "height" : 2365,
                // "width" : 1579
              },
              "on" : "http://www.example.org/iiif/LlangBrev/canvas/18"
          }],
          "otherContent":[]
         
   },
   {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/19",
          "@type" : "sc:Canvas",
          "label" : "Ascension_r",
          "height" : 300,
          "width" : 200,
          "images" : [{
              "@type" : "oa:Annotation",
              "motivation" : "sc:painting",
              "resource" : {
                "@id" : "http://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Butterflies_%28Costa_Rica%29.jpg/800px-Butterflies_%28Costa_Rica%29.jpg",
                "@type" : "dctypes:Image",
                "format" : "image/jpeg",
                // "height" : 2365,
                // "width" : 1579
              },
              "on" : "http://www.example.org/iiif/LlangBrev/canvas/19"
          }],
          "otherContent":[]
         
   },
   {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/20",
          "@type" : "sc:Canvas",
          "label" : "Ascension_v",
          "height" : 300,
          "width" : 200,
          "images" : [{
              "@type" : "oa:Annotation",
              "motivation" : "sc:painting",
              "resource" : {
                "@id" : "http://www.slu.edu/Images/marketing_communications/logos/slu/slu_2c.bmp",
                "@type" : "dctypes:Image",
                "format" : "image/jpeg",
                // "height" : 2365,
                // "width" : 1579
              },
              "on" : "http://www.example.org/iiif/LlangBrev/canvas/20"
          }],
          "otherContent":[]
         
   },
   {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/21",
          "@type" : "sc:Canvas",
          "label" : "Pentecost_r",
          "height" : 300,
          "width" : 200,
          "images" : [{
              "@type" : "oa:Annotation",
              "motivation" : "sc:painting",
              "resource" : {
                "@id" : "http://vaccinenewsdaily.com/wp-content/uploads/2015/01/SLU_Vert_blue.jpg",
                "@type" : "dctypes:Image",
                "format" : "image/jpeg",
                // "height" : 2365,
                // "width" : 1579
              },
              "on" : "http://www.example.org/iiif/LlangBrev/canvas/21"
          }],
          "otherContent":[]
         
   },
   {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/22",
          "@type" : "sc:Canvas",
          "label" : "Pentecost_v",
          "height" : 300,
          "width" : 200,
          "images" : [{
              "@type" : "oa:Annotation",
              "motivation" : "sc:painting",
              "resource" : {
                "@id" : "http://rbrua3v80lj2rulsf7iqfnpmf.wpengine.netdna-cdn.com/wp-content/uploads/2014/10/St_Louis_Blues3.jpg",
                "@type" : "dctypes:Image",
                "format" : "image/jpeg",
                // "height" : 2365,
                // "width" : 1579
              },
              "on" : "http://www.example.org/iiif/LlangBrev/canvas/22"
          }],
          "otherContent":[]
         
   },
   {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/23",
          "@type" : "sc:Canvas",
          "label" : "Pentecost After Advent_r",
          "height" : 300,
          "width" : 200,
          "images" : [{
              "@type" : "oa:Annotation",
              "motivation" : "sc:painting",
              "resource" : {
                "@id" : "http://www.sports-logos-screensavers.com/user/St_Louis_Blues4.jpg",
                "@type" : "dctypes:Image",
                "format" : "image/jpeg",
                // "height" : 2365,
                // "width" : 1579
              },
              "on" : "http://www.example.org/iiif/LlangBrev/canvas/23"
          }],
          "otherContent":[]
         
   },
   {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/24",
          "@type" : "sc:Canvas",
          "label" : "Pentecost After Advent_v",
          "height" : 300,
          "width" : 200,
          "images" : [{
              "@type" : "oa:Annotation",
              "motivation" : "sc:painting",
              "resource" : {
                "@id" : "http://p1.pichost.me/i/39/1623860.jpg",
                "@type" : "dctypes:Image",
                "format" : "image/jpeg",
                // "height" : 2365,
                // "width" : 1579
              },
              "on" : "http://www.example.org/iiif/LlangBrev/canvas/24"
          }],
          "otherContent":[]
         
   },
   {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/25",
          "@type" : "sc:Canvas",
          "label" : "Psalms 1-6",
          "height" : 300,
          "width" : 200,
          "images" : [],
          "otherContent":[]
         
    },
    {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/26",
          "@type" : "sc:Canvas",
          "label" : "Psalms 6-11",
          "height" : 300,
          "width" : 200,
          "images" : [],
          "otherContent":[]
         
    },
    {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/27",
          "@type" : "sc:Canvas",
          "label" : "Psalms 41-46",
          "height" : 300,
          "width" : 200,
          "images" : [],
          "otherContent":[]
         
    },
    {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/28",
          "@type" : "sc:Canvas",
          "label" : "Psalms 46-50",
          "height" : 300,
          "width" : 200,
          "images" : [],
          "otherContent":[]
         
    },
    {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/29",
          "@type" : "sc:Canvas",
          "label" : "Psalms 51-56",
          "height" : 300,
          "width" : 200,
          "images" : [],
          "otherContent":[]
         
    },
    {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/30",
          "@type" : "sc:Canvas",
          "label" : "Psalms 56-61",
          "height" : 300,
          "width" : 200,
          "images" : [],
          "otherContent":[]
         
    },
    {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/31",
          "@type" : "sc:Canvas",
          "label" : "Psalms 91-96",
          "height" : 300,
          "width" : 200,
          "images" : [],
          "otherContent":[]
         
    },
    {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/32",
          "@type" : "sc:Canvas",
          "label" : "Psalms 96-100",
          "height" : 300,
          "width" : 200,
          "images" : [],
          "otherContent":[]
         
    },
    {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/33",
          "@type" : "sc:Canvas",
          "label" : "Psalms 101-107",
          "height" : 300,
          "width" : 200,
          "images" : [],
          "otherContent":[]
         
    },
    {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/34",
          "@type" : "sc:Canvas",
          "label" : "Psalms 106-111",
          "height" : 300,
          "width" : 200,
          "images" : [],
          "otherContent":[]
         
    },
    {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/35",
          "@type" : "sc:Canvas",
          "label" : "Psalms 141-14150",
          "height" : 300,
          "width" : 200,
          "images" : [],
          "otherContent":[]
         
    },
    {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/36",
          "@type" : "sc:Canvas",
          "label" : "Psalms 146-150",
          "height" : 300,
          "width" : 200,
          "images" : [],
          "otherContent":[]
         
    },
    {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/37",
          "@type" : "sc:Canvas",
          "label" : "Apostles_r",
          "height" : 300,
          "width" : 200,
          "images" : [],
          "otherContent":[]
         
    },
    {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/38",
          "@type" : "sc:Canvas",
          "label" : "Apostles_v",
          "height" : 300,
          "width" : 200,
          "images" : [],
          "otherContent":[]
         
    },
    {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/39",
          "@type" : "sc:Canvas",
          "label" : "Virgins_r",
          "height" : 300,
          "width" : 200,
          "images" : [],
          "otherContent":[]
         
    },
    {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/40",
          "@type" : "sc:Canvas",
          "label" : "Virgins_v",
          "height" : 300,
          "width" : 200,
          "images" : [],
          "otherContent":[]
         
    },
    {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/41",
          "@type" : "sc:Canvas",
          "label" : "Andrew_r",
          "height" : 300,
          "width" : 200,
          "images" : [],
          "otherContent":[]
         
    },
    {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/42",
          "@type" : "sc:Canvas",
          "label" : "Andrew_v",
          "height" : 300,
          "width" : 200,
          "images" : [],
          "otherContent":[]
         
    },
    {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/43",
          "@type" : "sc:Canvas",
          "label" : "Petronilla_r",
          "height" : 300,
          "width" : 200,
          "images" : [],
          "otherContent":[]
         
    },
    {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/44",
          "@type" : "sc:Canvas",
          "label" : "Pertonilla_v",
          "height" : 300,
          "width" : 200,
          "images" : [],
          "otherContent":[]
         
    },
    {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/45",
          "@type" : "sc:Canvas",
          "label" : "Marcellinus_r",
          "height" : 300,
          "width" : 200,
          "images" : [],
          "otherContent":[]
         
    },
    {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/46",
          "@type" : "sc:Canvas",
          "label" : "Marcellinus_v",
          "height" : 300,
          "width" : 200,
          "images" : [],
          "otherContent":[]
         
    },
    {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/45",
          "@type" : "sc:Canvas",
          "label" : "Saturinus_r",
          "height" : 300,
          "width" : 200,
          "images" : [],
          "otherContent":[]
         
    },
    {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/46",
          "@type" : "sc:Canvas",
          "label" : "Saturinus_v",
          "height" : 300,
          "width" : 200,
          "images" : [],
          "otherContent":[]
         
    },
    {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/47",
          "@type" : "sc:Canvas",
          "label" : "OOV_r",
          "height" : 300,
          "width" : 200,
          "images" : [],
          "otherContent":[]
         
    },
    {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/48",
          "@type" : "sc:Canvas",
          "label" : "OOV_v",
          "height" : 300,
          "width" : 200,
          "images" : [],
          "otherContent":[]
         
    },
    {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/49",
          "@type" : "sc:Canvas",
          "label" : "OOD_r",
          "height" : 300,
          "width" : 200,
          "images" : [],
          "otherContent":[]
         
    },
    {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/50",
          "@type" : "sc:Canvas",
          "label" : "OOD_v",
          "height" : 300,
          "width" : 200,
          "images" : [],
          "otherContent":[]
         
    },
    {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/51",
          "@type" : "sc:Canvas",
          "label" : "misc_r",
          "height" : 300,
          "width" : 200,
          "images" : [],
          "otherContent":[]
         
    },
    {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/52",
          "@type" : "sc:Canvas",
          "label" : "misc_v",
          "height" : 300,
          "width" : 200,
          "images" : [],
          "otherContent":[]
         
    },
    {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/55",
          "@type" : "sc:Canvas",
          "label" : "SLU_VFL_MS_002_fol_b_r",
          "height" : 300,
          "width" : 200,
          "images" : [{
              "@type" : "oa:Annotation",
              "motivation" : "sc:painting",
              "resource" : {
                "@id" : "http://localhost:8080/brokenBooks/images/SLU_VFL_MS_002_fol_b_r.jpg",
                "@type" : "dctypes:Image",
                "format" : "image/jpeg",
                "height" : 2365,
                "width" : 1579
              },
              "on" : "http://www.example.org/iiif/LlangBrev/canvas/1_anchor"
          }],
          "otherContent":[{"@id":"http://www.example.org/iiif/LlangBrev/annoList/4", "@type":"sc:AnnotationList"}]
         
    },
    {
      //This will be the anchor canvas in the anchor range
          "@id" : "http://www.example.org/iiif/LlangBrev/canvas/56",
          "@type" : "sc:Canvas",
          "label" : "SLU_VFL_MS_002_fol_b_v",
          "height" : 300,
          "width" : 200,
          "images" : [{
              "@type" : "oa:Annotation",
              "motivation" : "sc:painting",
              "resource" : {
                "@id" : "http://localhost:8080/brokenBooks/images/SLU_VFL_MS_002_fol_b_v.jpg",
                "@type" : "dctypes:Image",
                "format" : "image/jpeg",
                "height" : 2365,
                "width" : 1579
              },
              "on" : "http://www.example.org/iiif/LlangBrev/canvas/1_anchor"
          }],
          "otherContent":[{"@id":"http://www.example.org/iiif/LlangBrev/annoList/5", "@type":"sc:AnnotationList"}]
         
    },
    ]
}], 
"structures" : [

{
  "@id":"http://www.example.org/iiif/LlangBrev/range/parent_aggr",
  "@type":"sc:Range",
  "label":"Llangattock Breviary Structure",
  "ranges" : [
      "http://www.example.org/iiif/LlangBrev/range/1",
      "http://www.example.org/iiif/LlangBrev/range/2",
      "http://www.example.org/iiif/LlangBrev/range/3",
      "http://www.example.org/iiif/LlangBrev/range/4",
      "http://www.example.org/iiif/LlangBrev/range/21",
      "http://www.example.org/iiif/LlangBrev/range/5"
  ],
  "canvases" :[],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},    
{
  "@id":"http://www.example.org/iiif/LlangBrev/range/1",
  "@type":"sc:Range",
  "label":"Calendar",
  "ranges" : [
      "http://www.example.org/iiif/LlangBrev/range/7",
      "http://www.example.org/iiif/LlangBrev/range/8",
      "http://www.example.org/iiif/LlangBrev/range/9",
      "http://www.example.org/iiif/LlangBrev/range/10",
      "http://www.example.org/iiif/LlangBrev/range/11",
      "http://www.example.org/iiif/LlangBrev/range/12"
      //add leaf ranges here in order for page order
  ],
  "canvases" :[],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},

{ //A connection of content can be made like this, but not fragments
  "@id":"http://www.example.org/iiif/LlangBrev/range/2",
  "@type":"sc:Range",
  "label":"Temporale",
  "ranges" : [
      "http://www.example.org/iiif/LlangBrev/range/13",
      "http://www.example.org/iiif/LlangBrev/range/14",
      "http://www.example.org/iiif/LlangBrev/range/15",
      "http://www.example.org/iiif/LlangBrev/range/53"
  ],
  "canvases" :[],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},

{//A connection of content can be made like this, but not fragments
  "@id":"http://www.example.org/iiif/LlangBrev/range/3",
  "@type":"sc:Range",
  "label":"Psalter",
  "ranges" : [
      "http://www.example.org/iiif/LlangBrev/range/16",
      "http://www.example.org/iiif/LlangBrev/range/17",
      "http://www.example.org/iiif/LlangBrev/range/18"
      //add leaf ranges here in order for page order
  ],
  "canvases" :[],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},


{
  "@id":"http://www.example.org/iiif/LlangBrev/range/4",
  "@type":"sc:Range",
  "label":"Sanctorale",
  "ranges" : [
      "http://www.example.org/iiif/LlangBrev/range/19",
      "http://www.example.org/iiif/LlangBrev/range/20",
  ],
  "canvases" :[],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},

{
  "@id":"http://www.example.org/iiif/LlangBrev/range/5",
  "@type":"sc:Range",
  "label":"Auxilary Texts",
  "ranges" : [
      "http://www.example.org/iiif/LlangBrev/range/22",
      "http://www.example.org/iiif/LlangBrev/range/23",
      "http://www.example.org/iiif/LlangBrev/range/24"
  ],
  "canvases" :[],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},


{
  "@id":"http://www.example.org/iiif/LlangBrev/range/7",
  "@type":"sc:Range",
  "label":"January",
  "ranges" : [
    "http://www.example.org/iiif/LlangBrev/range/25"
  ],
  "canvases" :[],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},

{
  "@id":"http://www.example.org/iiif/LlangBrev/range/8",
  "@type":"sc:Range",
  "label":"February",
  "ranges" : [
      "http://www.example.org/iiif/LlangBrev/range/26"
  ],
  "canvases" :[],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},
{
  "@id":"http://www.example.org/iiif/LlangBrev/range/9",
  "@type":"sc:Range",
  "label":"March",
  "ranges" : [
      "http://www.example.org/iiif/LlangBrev/range/27"
  ],
  "canvases" :[],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},

{
  "@id":"http://www.example.org/iiif/LlangBrev/range/10",
  "@type":"sc:Range",
  "label":"April",
  "ranges" : [
      "http://www.example.org/iiif/LlangBrev/range/28"
  ],
  "canvases" :[],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},

{
  "@id":"http://www.example.org/iiif/LlangBrev/range/11",
  "@type":"sc:Range",
  "label":"May",
  "ranges" : [
      "http://www.example.org/iiif/LlangBrev/range/29"
  ],
  "canvases" :[],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},

{
  "@id":"http://www.example.org/iiif/LlangBrev/range/12",
  "@type":"sc:Range",
  "label":"June",
  "ranges" : [
      "http://www.example.org/iiif/LlangBrev/range/30"
   ],
  "canvases" :[],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
}, //EX: we know this is the last section.  Here are 4 pages we know are in it.  It is not inside the table of contents array.

{
  "@id":"http://www.example.org/iiif/LlangBrev/range/13",
  "@type":"sc:Range",
  "label":"Advent - Epiphany",
  "ranges" : [
    "http://www.example.org/iiif/LlangBrev/range/31", 
    "http://www.example.org/iiif/LlangBrev/range/32"
  ],
  "canvases" :[],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},

{
  "@id":"http://www.example.org/iiif/LlangBrev/range/14",
  "@type":"sc:Range",
  "label":"Pre-Lent through Ascension",
  "ranges" : [
    "http://www.example.org/iiif/LlangBrev/range/33", 
    "http://www.example.org/iiif/LlangBrev/range/34"
  ],
  "canvases" :[],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},

{
  "@id":"http://www.example.org/iiif/LlangBrev/range/15",
  "@type":"sc:Range",
  "label":"Pentecost to Advent",
  "ranges" : [
    "http://www.example.org/iiif/LlangBrev/range/35", 
    "http://www.example.org/iiif/LlangBrev/range/36"
  ],
  "canvases" :[],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},

{
  "@id":"http://www.example.org/iiif/LlangBrev/range/16",
  "@type":"sc:Range",
  "label":"Psalms 1-50",
  "ranges" : [
    "http://www.example.org/iiif/LlangBrev/range/37", 
    "http://www.example.org/iiif/LlangBrev/range/38"
  ],
  "canvases" :[],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},

{
  "@id":"http://www.example.org/iiif/LlangBrev/range/17",
  "@type":"sc:Range",
  "label":"Psalms 51-100",
  "ranges" : [
      "http://www.example.org/iiif/LlangBrev/range/39", 
      "http://www.example.org/iiif/LlangBrev/range/40"
  ],
  "canvases" :[],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},

{
  "@id":"http://www.example.org/iiif/LlangBrev/range/18",
  "@type":"sc:Range",
  "label":"Psalms 101-150",
  "ranges" : [
      "http://www.example.org/iiif/LlangBrev/range/41", 
      "http://www.example.org/iiif/LlangBrev/range/42"
  ],
  "canvases" :[],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},
{
  "@id":"http://www.example.org/iiif/LlangBrev/range/19",
  "@type":"sc:Range",
  "label":"Andrew (Nov 30)-Petronilla(May31)",
  "ranges" : [
      "http://www.example.org/iiif/LlangBrev/range/46",
      "http://www.example.org/iiif/LlangBrev/range/47"
  ],
  "canvases" :[],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},
{
  "@id":"http://www.example.org/iiif/LlangBrev/range/20",
  "@type":"sc:Range",
  "label":"Marcellinus (June 2)–Satirinus(Nov 29)",
  "ranges" : [
      "http://www.example.org/iiif/LlangBrev/range/48",
      "http://www.example.org/iiif/LlangBrev/range/49"
  ],
  "canvases" :[],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},
{
  "@id":"http://www.example.org/iiif/LlangBrev/range/21",
  "@type":"sc:Range",
  "label":"Common of Saints",
  "ranges" : [
      "http://www.example.org/iiif/LlangBrev/range/43"
  ],
  "canvases" :[],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},
{
  "@id":"http://www.example.org/iiif/LlangBrev/range/22",
  "@type":"sc:Range",
  "label":"Office of the Virgin",
  "ranges" : [
      "http://www.example.org/iiif/LlangBrev/range/50"
  ],
  "canvases" :[],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},
{
  "@id":"http://www.example.org/iiif/LlangBrev/range/23",
  "@type":"sc:Range",
  "label":"Office of the Dead",
  "ranges" : [
      "http://www.example.org/iiif/LlangBrev/range/51"
  ],
  "canvases" :[],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},
{
  "@id":"http://www.example.org/iiif/LlangBrev/range/24",
  "@type":"sc:Range",
  "label":"Miscellaneous",
  "ranges" : [
      "http://www.example.org/iiif/LlangBrev/range/52"
  ],
  "canvases" :[],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},
{
  "@id":"http://www.example.org/iiif/LlangBrev/range/25",
  "@type":"sc:Range",
  "label":"January Text",
  "ranges" : [
      
  ],
  "canvases" :["http://www.example.org/iiif/LlangBrev/canvas/1","http://www.example.org/iiif/LlangBrev/canvas/2"],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : [{"@id":"http://www.example.org/iiif/LlangBrev/annoList/3", "@type":"sc:AnnotationList"}]
},
{
  "@id":"http://www.example.org/iiif/LlangBrev/range/26",
  "@type":"sc:Range",
  "label":"February Text",
  "ranges" : [
      
  ],
  "canvases" :["http://www.example.org/iiif/LlangBrev/canvas/3","http://www.example.org/iiif/LlangBrev/canvas/4"],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},
{
  "@id":"http://www.example.org/iiif/LlangBrev/range/27",
  "@type":"sc:Range",
  "label":"March Text",
  "ranges" : [
      
  ],
  "canvases" :["http://www.example.org/iiif/LlangBrev/canvas/5","http://www.example.org/iiif/LlangBrev/canvas/6"],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},
{
  "@id":"http://www.example.org/iiif/LlangBrev/range/28",
  "@type":"sc:Range",
  "label":"April Text",
  "ranges" : [
      
  ],
  "canvases" :["http://www.example.org/iiif/LlangBrev/canvas/7","http://www.example.org/iiif/LlangBrev/canvas/8"],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},
{
  "@id":"http://www.example.org/iiif/LlangBrev/range/29",
  "@type":"sc:Range",
  "label":"May Text",
  "ranges" : [
      
  ],
  "canvases" :["http://www.example.org/iiif/LlangBrev/canvas/9","http://www.example.org/iiif/LlangBrev/canvas/10"],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},
{
  "@id":"http://www.example.org/iiif/LlangBrev/range/30",
  "@type":"sc:Range",
  "label":"June Text",
  "ranges" : [
      
  ],
  "canvases" :["http://www.example.org/iiif/LlangBrev/canvas/11","http://www.example.org/iiif/LlangBrev/canvas/12"],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},
{
  "@id":"http://www.example.org/iiif/LlangBrev/range/31",
  "@type":"sc:Range",
  "label":"Advent Text",
  "ranges" : [
      
  ],
  "canvases" :["http://www.example.org/iiif/LlangBrev/canvas/13","http://www.example.org/iiif/LlangBrev/canvas/14"],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},
{
  "@id":"http://www.example.org/iiif/LlangBrev/range/32",
  "@type":"sc:Range",
  "label":"Epiphany Text",
  "ranges" : [
      
  ],
  "canvases" :["http://www.example.org/iiif/LlangBrev/canvas/15","http://www.example.org/iiif/LlangBrev/canvas/16"],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},
{
  "@id":"http://www.example.org/iiif/LlangBrev/range/33",
  "@type":"sc:Range",
  "label":"Pre-Lent Text",
  "ranges" : [
      
  ],
  "canvases" :["http://www.example.org/iiif/LlangBrev/canvas/17","http://www.example.org/iiif/LlangBrev/canvas/18"],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},
{
  "@id":"http://www.example.org/iiif/LlangBrev/range/34",
  "@type":"sc:Range",
  "label":"Ascension Text",
  "ranges" : [
      
  ],
  "canvases" :["http://www.example.org/iiif/LlangBrev/canvas/19","http://www.example.org/iiif/LlangBrev/canvas/20"],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},
{
  "@id":"http://www.example.org/iiif/LlangBrev/range/35",
  "@type":"sc:Range",
  "label":"Pentecost Text",
  "ranges" : [
      
  ],
  "canvases" :["http://www.example.org/iiif/LlangBrev/canvas/21","http://www.example.org/iiif/LlangBrev/canvas/22"],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},
{
  "@id":"http://www.example.org/iiif/LlangBrev/range/36",
  "@type":"sc:Range",
  "label":"Advent After Pentecost Text",
  "ranges" : [
      
  ],
  "canvases" :["http://www.example.org/iiif/LlangBrev/canvas/23","http://www.example.org/iiif/LlangBrev/canvas/24"],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},
{
  "@id":"http://www.example.org/iiif/LlangBrev/range/37",
  "@type":"sc:Range",
  "label":"Psalms 1-11 Text",
  "ranges" : [
      
  ],
  "canvases" :["http://www.example.org/iiif/LlangBrev/canvas/25","http://www.example.org/iiif/LlangBrev/canvas/26"],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},
{
  "@id":"http://www.example.org/iiif/LlangBrev/range/38",
  "@type":"sc:Range",
  "label":"Psalms 41-50 Text",
  "ranges" : [
      
  ],
  "canvases" :["http://www.example.org/iiif/LlangBrev/canvas/27","http://www.example.org/iiif/LlangBrev/canvas/28"],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},
{
  "@id":"http://www.example.org/iiif/LlangBrev/range/39",
  "@type":"sc:Range",
  "label":"Psalms 51-61 Text",
  "ranges" : [
      
  ],
  "canvases" :["http://www.example.org/iiif/LlangBrev/canvas/29","http://www.example.org/iiif/LlangBrev/canvas/30"],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},
{
  "@id":"http://www.example.org/iiif/LlangBrev/range/40",
  "@type":"sc:Range",
  "label":"Psalms 91-100 Text",
  "ranges" : [
      
  ],
  "canvases" :["http://www.example.org/iiif/LlangBrev/canvas/31","http://www.example.org/iiif/LlangBrev/canvas/32"],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},
{
  "@id":"http://www.example.org/iiif/LlangBrev/range/41",
  "@type":"sc:Range",
  "label":"Psalms 101-111 Text",
  "ranges" : [
      
  ],
  "canvases" :["http://www.example.org/iiif/LlangBrev/canvas/33","http://www.example.org/iiif/LlangBrev/canvas/34"],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},
{
  "@id":"http://www.example.org/iiif/LlangBrev/range/42",
  "@type":"sc:Range",
  "label":"Psalms 141-150 Text",
  "ranges" : [
      
  ],
  "canvases" :["http://www.example.org/iiif/LlangBrev/canvas/35","http://www.example.org/iiif/LlangBrev/canvas/36"],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},
{
  "@id":"http://www.example.org/iiif/LlangBrev/range/43",
  "@type":"sc:Range",
  "label":"Apostles, Martyrs, Confessors, Virgins",
  "ranges" : [
      "http://www.example.org/iiif/LlangBrev/range/44",
      "http://www.example.org/iiif/LlangBrev/range/45"
  ],
  "canvases" :[],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},
{
  "@id":"http://www.example.org/iiif/LlangBrev/range/44",
  "@type":"sc:Range",
  "label":"Apostles Text",
  "ranges" : [

  ],
  "canvases" :["http://www.example.org/iiif/LlangBrev/canvas/37","http://www.example.org/iiif/LlangBrev/canvas/38"],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},
{
  "@id":"http://www.example.org/iiif/LlangBrev/range/45",
  "@type":"sc:Range",
  "label":"Virgins Text",
  "ranges" : [

  ],
  "canvases" :["http://www.example.org/iiif/LlangBrev/canvas/39","http://www.example.org/iiif/LlangBrev/canvas/40"],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},
{
  "@id":"http://www.example.org/iiif/LlangBrev/range/46",
  "@type":"sc:Range",
  "label":"Andrew Text",
  "ranges" : [

  ],
  "canvases" :["http://www.example.org/iiif/LlangBrev/canvas/41","http://www.example.org/iiif/LlangBrev/canvas/42"],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},
{
  "@id":"http://www.example.org/iiif/LlangBrev/range/47",
  "@type":"sc:Range",
  "label":"Petronilla Text",
  "ranges" : [

  ],
  "canvases" :["http://www.example.org/iiif/LlangBrev/canvas/43","http://www.example.org/iiif/LlangBrev/canvas/44"],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},
{
  "@id":"http://www.example.org/iiif/LlangBrev/range/48",
  "@type":"sc:Range",
  "label":"Marcellinus Text",
  "ranges" : [

  ],
  "canvases" :["http://www.example.org/iiif/LlangBrev/canvas/45","http://www.example.org/iiif/LlangBrev/canvas/46"],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},
{
  "@id":"http://www.example.org/iiif/LlangBrev/range/49",
  "@type":"sc:Range",
  "label":"Saturinus Text",
  "ranges" : [

  ],
  "canvases" :["http://www.example.org/iiif/LlangBrev/canvas/47","http://www.example.org/iiif/LlangBrev/canvas/48"],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},
{
  "@id":"http://www.example.org/iiif/LlangBrev/range/50",
  "@type":"sc:Range",
  "label":"Office of the Virgin Text",
  "ranges" : [

  ],
  "canvases" :["http://www.example.org/iiif/LlangBrev/canvas/49","http://www.example.org/iiif/LlangBrev/canvas/50"],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},
{
  "@id":"http://www.example.org/iiif/LlangBrev/range/51",
  "@type":"sc:Range",
  "label":"Office of the Dead Text",
  "ranges" : [

  ],
  "canvases" :["http://www.example.org/iiif/LlangBrev/canvas/51","http://www.example.org/iiif/LlangBrev/canvas/52"],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
},
{
  "@id":"http://www.example.org/iiif/LlangBrev/range/52",
  "@type":"sc:Range",
  "label":"Miscellaneous Text",
  "ranges" : [

  ],
  "canvases" :["http://www.example.org/iiif/LlangBrev/canvas/53","http://www.example.org/iiif/LlangBrev/canvas/54"],
  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
  "otherContent" : []
}
//{
//  "@id":"http://www.example.org/iiif/LlangBrev/range/53",
//  "@type":"sc:Range",
//  "label":"Demo Test Leaf",
//  "ranges" : [
//
//  ],
//  "canvases" :["http://www.example.org/iiif/LlangBrev/canvas/55","http://www.example.org/iiif/LlangBrev/canvas/56"],
//  "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
//  "otherContent" : []
//}

]
};

var emptyAnnoList = {
            "@id" : "http://www.example.org/iiif/LlangBrev/annoList/empty",
            "@type" : "sc:AnnotationList",
            "context" : "http://www.shared-canvas.org/ns/context.json",
            "label" : "EMPTY",
            "resources" : [],
            "on" :  "demo"
        };
var annotationLists = [
    {
      "@id" : "http://www.example.org/iiif/LlangBrev/annoList/1",
      "@type" : "sc:AnnotationList",
      "context" : "http://www.shared-canvas.org/ns/context.json",
      "label" : "Fragments",
      "resources" : [ 
        {
          "@id" : "http://www.example.org/iiif/LlangBrev/anno/1",
          "@type" : "oa:Annotation",
          "motivation" : "oa:describing",
          "label" : "BB Identifier",
          "resource" : {
            "@type" : "cnt:ContentAsText",
            "cnt:chars" : "BB_LLang_01"
          },
          "on" : "http://www.example.org/iiif/LlangBrev/canvas/1"
        },
        {
          "@id" : "http://www.example.org/iiif/LlangBrev/anno/2",
          "@type" : "oa:Annotation",
          "motivation" : "oa:describing",
          "label" : "Nickname",
          "resource" : {
            "@type" : "cnt:ContentAsText",
            "cnt:chars" : "Bryan's test"
          },
          "on" : "http://www.example.org/iiif/LlangBrev/canvas/1"
        },
        {
          "@id" : "http://www.example.org/iiif/LlangBrev/anno/3",
          "@type" : "oa:Annotation",
          "motivation" : "oa:describing",
          "label" : "Date Acquired",
          "resource" : {
            "@type" : "cnt:ContentAsText",
            "cnt:chars" : "6/12/15"
          },
          "on" : "http://www.example.org/iiif/LlangBrev/canvas/1"
        }
      ],
      "on" :  "http://www.example.org/iiif/LlangBrev/canvas/1"//end resources
  },

  {
      "@id" : "http://www.example.org/iiif/LlangBrev/annoList/2",
      "@type" : "sc:AnnotationList",
      "context" : "http://www.shared-canvas.org/ns/context.json",
      "label" : "Fragments",
      "resources" : [ 
        {
          "@id" : "http://www.example.org/iiif/LlangBrev/anno/4",
          "@type" : "oa:Annotation",
          "motivation" : "oa:describing",
          "label" : "Place Of Origin",
          "resource" : {
            "@type" : "cnt:ContentAsText",
            "cnt:chars" : "St. Louis"
          },
          "on" : "http://www.example.org/iiif/LlangBrev/canvas/2"
        },
        {
          "@id" : "http://www.example.org/iiif/LlangBrev/anno/5",
          "@type" : "oa:Annotation",
          "motivation" : "oa:describing",
          "label" : "Condition",
          "resource" : {
            "@type" : "cnt:ContentAsText",
            "cnt:chars" : "Deplorable"
          },
          "on" : "http://www.example.org/iiif/LlangBrev/canvas/2"
        },
        {
          "@id" : "http://www.example.org/iiif/LlangBrev/anno/6",
          "@type" : "oa:Annotation",
          "motivation" : "oa:describing",
          "label" : "Illustrations",
          "resource" : {
            "@type" : "cnt:ContentAsText",
            "cnt:chars" : "Smiley Face Doodles"
          },
          "on" : "http://www.example.org/iiif/LlangBrev/canvas/2"
        }
      ], //end resources
      "on" : "http://www.example.org/iiif/LlangBrev/canvas/2"
  },
  {
      "@id" : "http://www.example.org/iiif/LlangBrev/annoList/3",
      "@type" : "sc:AnnotationList",
      "context" : "http://www.shared-canvas.org/ns/context.json",
      "label" : "Fragments",
      "resources" : [ 
        {
          "@id" : "http://www.example.org/iiif/LlangBrev/anno/7",
          "@type" : "oa:Annotation",
          "motivation" : "oa:describing",
          "label" : "General Metadata",
          "resource" : {
            "@type" : "cnt:ContentAsText",
            "cnt:chars" : "This is the very first leaf in the breviary.  An interesting face is that Leonardo da Vinci created it, which makes no sense."
          },
          "on" : "http://www.example.org/iiif/LlangBrev/range/25"
        },
        {
          "@id" : "http://www.example.org/iiif/LlangBrev/anno/8",
          "@type" : "oa:Annotation",
          "motivation" : "oa:describing",
          "label" : "Title",
          "resource" : {
            "@type" : "cnt:ContentAsText",
            "cnt:chars" : "Suspected da Vinci Writings"
          },
          "on" : "http://www.example.org/iiif/LlangBrev/range/25"
        },
        {
          "@id" : "http://www.example.org/iiif/LlangBrev/anno/9",
          "@type" : "oa:Annotation",
          "motivation" : "oa:describing",
          "label" : "Other Content Info",
          "resource" : {
            "@type" : "cnt:ContentAsText",
            "cnt:chars" : "It takes up a much smaller portion of the page than usual."
          },
         "on" : "http://www.example.org/iiif/LlangBrev/range/25"
        }
      ], //end resources
      "on" : "http://www.example.org/iiif/LlangBrev/range/25"
  },
  {
      "@id" : "http://www.example.org/iiif/LlangBrev/annoList/4",
      "@type" : "sc:AnnotationList",
      "context" : "http://www.shared-canvas.org/ns/context.json",
      "label" : "Fragments",
      "resources" : [ 
        {
          "@id" : "http://www.example.org/iiif/LlangBrev/anno/10",
          "@type" : "oa:Annotation",
          "motivation" : "oa:describing",
          "label" : "BB Identifier",
          "resource" : {
            "@type" : "cnt:ContentAsText",
            "cnt:chars" : "BB_Llang_003_r"
          },
          "on" : "http://www.example.org/iiif/LlangBrev/canvas/55"
        },
         {
          "@id" : "http://www.example.org/iiif/LlangBrev/anno/11",
          "@type" : "oa:Annotation",
          "motivation" : "oa:describing",
          "label" : "Institution or Repository",
          "resource" : {
            "@type" : "cnt:ContentAsText",
            "cnt:chars" : "Saint Louis University"
          },
          "on" : "http://www.example.org/iiif/LlangBrev/canvas/55"
        },
        {
          "@id" : "http://www.example.org/iiif/LlangBrev/anno/12",
          "@type" : "oa:Annotation",
          "motivation" : "oa:describing",
          "label" : "Shelfmark",
          "resource" : {
            "@type" : "cnt:ContentAsText",
            "cnt:chars" : "SLU VFL MS 002, fol. b, recto"
          },
          "on" : "http://www.example.org/iiif/LlangBrev/canvas/55"
        },
        {
          "@id" : "http://www.example.org/iiif/LlangBrev/anno/13",
          "@type" : "oa:Annotation",
          "motivation" : "oa:describing",
          "label" : "Date Acquired",
          "resource" : {
            "@type" : "cnt:ContentAsText",
            "cnt:chars" : "1962"
          },
          "on" : "http://www.example.org/iiif/LlangBrev/canvas/55"
        },
        {
          "@id" : "http://www.example.org/iiif/LlangBrev/anno/14",
          "@type" : "oa:Annotation",
          "motivation" : "oa:describing",
          "label" : "Provenance",
          "resource" : {
            "@type" : "cnt:ContentAsText",
            "cnt:chars" : "Milton& Gail Fischmann, 1962"
          },
          "on" : "http://www.example.org/iiif/LlangBrev/canvas/55"
        },
        {
          "@id" : "http://www.example.org/iiif/LlangBrev/anno/15",
          "@type" : "oa:Annotation",
          "motivation" : "oa:describing",
          "label" : "Bibliography",
          "resource" : {
            "@type" : "cnt:ContentAsText",
            "cnt:chars" : "Evans, E.S. \"Medieval manuscripts at Saint Louis University: a catalogue,\" in Manuscripta 47/48 (2003/2004), p. 56-64."
          },
          "on" : "http://www.example.org/iiif/LlangBrev/canvas/55"
        },
        {
          "@id" : "http://www.example.org/iiif/LlangBrev/anno/16",
          "@type" : "oa:Annotation",
          "motivation" : "oa:describing",
          "label" : "Language",
          "resource" : {
            "@type" : "cnt:ContentAsText",
            "cnt:chars" : "Latin"
          },
          "on" : "http://www.example.org/iiif/LlangBrev/canvas/55"
        },
        {
          "@id" : "http://www.example.org/iiif/LlangBrev/anno/17",
          "@type" : "oa:Annotation",
          "motivation" : "oa:describing",
          "label" : "Subject",
          "resource" : {
            "@type" : "cnt:ContentAsText",
            "cnt:chars" : "Catholic Church, Liturgy"
          },
          "on" : "http://www.example.org/iiif/LlangBrev/canvas/55"
        },
        {
          "@id" : "http://www.example.org/iiif/LlangBrev/anno/18",
          "@type" : "oa:Annotation",
          "motivation" : "oa:describing",
          "label" : "Title (refers to contents)",
          "resource" : {
            "@type" : "cnt:ContentAsText",
            "cnt:chars" : "Feast of Holy Innocents (Dec 28), Matins, Lessons 4-7"
          },
          "on" : "http://www.example.org/iiif/LlangBrev/canvas/55"
        },
        {
          "@id" : "http://www.example.org/iiif/LlangBrev/anno/19",
          "@type" : "oa:Annotation",
          "motivation" : "oa:describing",
          "label" : "Incipit",
          "resource" : {
            "@type" : "cnt:ContentAsText",
            "cnt:chars" : "[Et ideo dignum...fuit causa]//p[o]ene, qui extitit et corone, ip[s]e odii c[aus]a qui p[rae]mii ..."
          },
          "on" : "http://www.example.org/iiif/LlangBrev/canvas/55"
        },
        {
          "@id" : "http://www.example.org/iiif/LlangBrev/anno/19",
          "@type" : "oa:Annotation",
          "motivation" : "oa:describing",
          "label" : "Date",
          "resource" : {
            "@type" : "cnt:ContentAsText",
            "cnt:chars" : "1441-1448"
          },
          "on" : "http://www.example.org/iiif/LlangBrev/canvas/55"
        },
        {
          "@id" : "http://www.example.org/iiif/LlangBrev/anno/20",
          "@type" : "oa:Annotation",
          "motivation" : "oa:describing",
          "label" : "Place Of Origin",
          "resource" : {
            "@type" : "cnt:ContentAsText",
            "cnt:chars" : "Ferrara, Italy"
          },
          "on" : "http://www.example.org/iiif/LlangBrev/canvas/55"
        },
        {
          "@id" : "http://www.example.org/iiif/LlangBrev/anno/21",
          "@type" : "oa:Annotation",
          "motivation" : "oa:describing",
          "label" : "Format (single leaf, half bifolium, fragment)",
          "resource" : {
            "@type" : "cnt:ContentAsText",
            "cnt:chars" : "Single leaf"
          },
          "on" : "http://www.example.org/iiif/LlangBrev/canvas/55"
        },
        {
          "@id" : "http://www.example.org/iiif/LlangBrev/anno/22",
          "@type" : "oa:Annotation",
          "motivation" : "oa:describing",
          "label" : "Dimensions",
          "resource" : {
            "@type" : "cnt:ContentAsText",
            "cnt:chars" : "275 x 200 (170 x 130) mm"
          },
          "on" : "http://www.example.org/iiif/LlangBrev/canvas/55"
        },
        {
          "@id" : "http://www.example.org/iiif/LlangBrev/anno/23",
          "@type" : "oa:Annotation",
          "motivation" : "oa:describing",
          "label" : "Columns",
          "resource" : {
            "@type" : "cnt:ContentAsText",
            "cnt:chars" : "2"
          },
          "on" : "http://www.example.org/iiif/LlangBrev/canvas/55"
        },
        {
          "@id" : "http://www.example.org/iiif/LlangBrev/anno/24",
          "@type" : "oa:Annotation",
          "motivation" : "oa:describing",
          "label" : "Lines",
          "resource" : {
            "@type" : "cnt:ContentAsText",
            "cnt:chars" : "30"
          },
          "on" : "http://www.example.org/iiif/LlangBrev/canvas/55"
        },
        {
          "@id" : "http://www.example.org/iiif/LlangBrev/anno/25",
          "@type" : "oa:Annotation",
          "motivation" : "oa:describing",
          "label" : "Script",
          "resource" : {
            "@type" : "cnt:ContentAsText",
            "cnt:chars" : "Gothic textualis rotunda"
          },
          "on" : "http://www.example.org/iiif/LlangBrev/canvas/55"
        },
        {
          "@id" : "http://www.example.org/iiif/LlangBrev/anno/26",
          "@type" : "oa:Annotation",
          "motivation" : "oa:describing",
          "label" : "Decorations",
          "resource" : {
            "@type" : "cnt:ContentAsText",
            "cnt:chars" : "4 two-line initials, two vertical bar extensions terminating in floral and foliate forms"
          },
          "on" : "http://www.example.org/iiif/LlangBrev/canvas/55"
        },
        {
          "@id" : "http://www.example.org/iiif/LlangBrev/anno/27",
          "@type" : "oa:Annotation",
          "motivation" : "oa:describing",
          "label" : "Artist(s)",
          "resource" : {
            "@type" : "cnt:ContentAsText",
            "cnt:chars" : "Giorgio d'Alemagna (active 1441-1479) and others"
          },
          "on" : "http://www.example.org/iiif/LlangBrev/canvas/55"
        }
      ], //end resources
      "on" : "http://www.example.org/iiif/LlangBrev/canvas/55"
  },
  {
      "@id" : "http://www.example.org/iiif/LlangBrev/annoList/5",
      "@type" : "sc:AnnotationList",
      "context" : "http://www.shared-canvas.org/ns/context.json",
      "label" : "Fragments",
      "resources" : [ 
        {
          "@id" : "http://www.example.org/iiif/LlangBrev/anno/29",
          "@type" : "oa:Annotation",
          "motivation" : "oa:describing",
          "label" : "BB Identifier",
          "resource" : {
            "@type" : "cnt:ContentAsText",
            "cnt:chars" : "BB_Llang_003_v"
          },
          "on" : "http://www.example.org/iiif/LlangBrev/canvas/56"
        },
         {
          "@id" : "http://www.example.org/iiif/LlangBrev/anno/30",
          "@type" : "oa:Annotation",
          "motivation" : "oa:describing",
          "label" : "Institution or Repository",
          "resource" : {
            "@type" : "cnt:ContentAsText",
            "cnt:chars" : "Saint Louis University"
          },
          "on" : "http://www.example.org/iiif/LlangBrev/canvas/56"
        },
        {
          "@id" : "http://www.example.org/iiif/LlangBrev/anno/31",
          "@type" : "oa:Annotation",
          "motivation" : "oa:describing",
          "label" : "Shelfmark",
          "resource" : {
            "@type" : "cnt:ContentAsText",
            "cnt:chars" : "SLU VFL MS 002, fol. b, verso"
          },
          "on" : "http://www.example.org/iiif/LlangBrev/canvas/56"
        },
        {
          "@id" : "http://www.example.org/iiif/LlangBrev/anno/32",
          "@type" : "oa:Annotation",
          "motivation" : "oa:describing",
          "label" : "Date Acquired",
          "resource" : {
            "@type" : "cnt:ContentAsText",
            "cnt:chars" : "1962"
          },
          "on" : "http://www.example.org/iiif/LlangBrev/canvas/56"
        },
        {
          "@id" : "http://www.example.org/iiif/LlangBrev/anno/33",
          "@type" : "oa:Annotation",
          "motivation" : "oa:describing",
          "label" : "Provenance",
          "resource" : {
            "@type" : "cnt:ContentAsText",
            "cnt:chars" : "Milton& Gail Fischmann, 1962"
          },
          "on" : "http://www.example.org/iiif/LlangBrev/canvas/56"
        },
        {
          "@id" : "http://www.example.org/iiif/LlangBrev/anno/34",
          "@type" : "oa:Annotation",
          "motivation" : "oa:describing",
          "label" : "Bibliography",
          "resource" : {
            "@type" : "cnt:ContentAsText",
            "cnt:chars" : "Evans, E.S. \"Medieval manuscripts at Saint Louis University: a catalogue,\" in Manuscripta 47/48 (2003/2004), p. 56-64."
          },
          "on" : "http://www.example.org/iiif/LlangBrev/canvas/56"
        },
        {
          "@id" : "http://www.example.org/iiif/LlangBrev/anno/35",
          "@type" : "oa:Annotation",
          "motivation" : "oa:describing",
          "label" : "Language",
          "resource" : {
            "@type" : "cnt:ContentAsText",
            "cnt:chars" : "Latin"
          },
          "on" : "http://www.example.org/iiif/LlangBrev/canvas/56"
        },
        {
          "@id" : "http://www.example.org/iiif/LlangBrev/anno/36",
          "@type" : "oa:Annotation",
          "motivation" : "oa:describing",
          "label" : "Subject",
          "resource" : {
            "@type" : "cnt:ContentAsText",
            "cnt:chars" : "Catholic Church, Liturgy"
          },
          "on" : "http://www.example.org/iiif/LlangBrev/canvas/56"
        },
        {
          "@id" : "http://www.example.org/iiif/LlangBrev/anno/37",
          "@type" : "oa:Annotation",
          "motivation" : "oa:describing",
          "label" : "Title (refers to contents)",
          "resource" : {
            "@type" : "cnt:ContentAsText",
            "cnt:chars" : "Feast of Holy Innocents (Dec 28), Matins, Lessons 7-9, Laud"
          },
          "on" : "http://www.example.org/iiif/LlangBrev/canvas/56"
        },
        {
          "@id" : "http://www.example.org/iiif/LlangBrev/anno/38",
          "@type" : "oa:Annotation",
          "motivation" : "oa:describing",
          "label" : "Explicit",
          "resource" : {
            "@type" : "cnt:ContentAsText",
            "cnt:chars" : "Cum rel[iquis] a[n]t[iphona]. A bymatu et infra occidit multos pueros hero//[des propter "
          },
          "on" : "http://www.example.org/iiif/LlangBrev/canvas/56"
        },
        {
          "@id" : "http://www.example.org/iiif/LlangBrev/anno/39",
          "@type" : "oa:Annotation",
          "motivation" : "oa:describing",
          "label" : "Date",
          "resource" : {
            "@type" : "cnt:ContentAsText",
            "cnt:chars" : "1441-1448"
          },
          "on" : "http://www.example.org/iiif/LlangBrev/canvas/56"
        },
        {
          "@id" : "http://www.example.org/iiif/LlangBrev/anno/40",
          "@type" : "oa:Annotation",
          "motivation" : "oa:describing",
          "label" : "Place Of Origin",
          "resource" : {
            "@type" : "cnt:ContentAsText",
            "cnt:chars" : "Ferrara, Italy"
          },
          "on" : "http://www.example.org/iiif/LlangBrev/canvas/56"
        },
        {
          "@id" : "http://www.example.org/iiif/LlangBrev/anno/41",
          "@type" : "oa:Annotation",
          "motivation" : "oa:describing",
          "label" : "Format (single leaf, half bifolium, fragment)",
          "resource" : {
            "@type" : "cnt:ContentAsText",
            "cnt:chars" : "Single leaf"
          },
          "on" : "http://www.example.org/iiif/LlangBrev/canvas/56"
        },
        {
          "@id" : "http://www.example.org/iiif/LlangBrev/anno/42",
          "@type" : "oa:Annotation",
          "motivation" : "oa:describing",
          "label" : "Dimensions",
          "resource" : {
            "@type" : "cnt:ContentAsText",
            "cnt:chars" : "275 x 200 (170 x 130) mm"
          },
          "on" : "http://www.example.org/iiif/LlangBrev/canvas/56"
        },
        {
          "@id" : "http://www.example.org/iiif/LlangBrev/anno/43",
          "@type" : "oa:Annotation",
          "motivation" : "oa:describing",
          "label" : "Columns",
          "resource" : {
            "@type" : "cnt:ContentAsText",
            "cnt:chars" : "2"
          },
          "on" : "http://www.example.org/iiif/LlangBrev/canvas/55"
        },
        {
          "@id" : "http://www.example.org/iiif/LlangBrev/anno/44",
          "@type" : "oa:Annotation",
          "motivation" : "oa:describing",
          "label" : "Lines",
          "resource" : {
            "@type" : "cnt:ContentAsText",
            "cnt:chars" : "30"
          },
          "on" : "http://www.example.org/iiif/LlangBrev/canvas/56"
        },
        {
          "@id" : "http://www.example.org/iiif/LlangBrev/anno/45",
          "@type" : "oa:Annotation",
          "motivation" : "oa:describing",
          "label" : "Script",
          "resource" : {
            "@type" : "cnt:ContentAsText",
            "cnt:chars" : "Gothic textualis rotunda"
          },
          "on" : "http://www.example.org/iiif/LlangBrev/canvas/56"
        },
        {
          "@id" : "http://www.example.org/iiif/LlangBrev/anno/46",
          "@type" : "oa:Annotation",
          "motivation" : "oa:describing",
          "label" : "Decorations",
          "resource" : {
            "@type" : "cnt:ContentAsText",
            "cnt:chars" : "2 two-line initials, two vertical bar extensions terminating in floral and foliate forms"
          },
          "on" : "http://www.example.org/iiif/LlangBrev/canvas/56"
        },
        {
          "@id" : "http://www.example.org/iiif/LlangBrev/anno/47",
          "@type" : "oa:Annotation",
          "motivation" : "oa:describing",
          "label" : "Artist(s)",
          "resource" : {
            "@type" : "cnt:ContentAsText",
            "cnt:chars" : "Giorgio d'Alemagna (active 1441-1479) and others"
          },
          "on" : "http://www.example.org/iiif/LlangBrev/canvas/56"
        }],
        "on" : "http://www.example.org/iiif/LlangBrev/canvas/56"
  //Everything above this fits into the January leaf (and its canvases.)
        }]; // end lists;

//    function getManifest(){
//        var url="http://localhost:8080/brokenBooks/getManifest";
//        $.post(url, function(data){
//            //console.log(data);
//            data=JSON.parse(data);
//            rangeCollection = data.structures;
//            manifestCanvases = data.sequences[0];
//            getAllAnnotations();
//        });
//    }
    
/* 
 * For now, any of the BB pages should tell you what user you are.  This is a helper function to get the manifest ID for what user you are to use in the update functions
 * for the structure and sequence arrays.  It also sets the global manifest and manifestID variables.  
 */
function getManifestID(){
    var forProject = detectWho();
    var properties={"@type" : "sc:Manifest", "forProject":forProject};
    var localID = "unknown";
    var url="http://localhost:8080/brokenBooks/getAnnotationByPropertiesServlet";
    var params = {"content" : JSON.stringify(properties)};
    var windowurl = document.location.href;
    if(windowurl.indexOf("demo=1") > -1){
        rangeCollection = testManifest.structures;
        manifestCanvases = testManifest.sequences[0].canvases;
        manifest = testManifest;
        manifestID = testManifest["@id"];
    }
    else{
        $.post(url, params, function(data){
           var manifest_data = JSON.parse(data);
           manifest = manifest_data[0];
           rangeCollection = manifest.structures;
           manifestCanvases = manifest.sequences[0].canvases;
           manifestID = manifest["@id"];
           localID = manifestID;
           $(".prepareleaf").show();
           return localID;
        });
    }
    
}

/* This function can be used to circumvent the canvas and ask the server for all the canvases for a users manifest.  Right now, 1 user has 1 manifest, 1 set of ranges. */
function getAllRanges(){
  //THERE WILL AT LEAST BE ONE RANGE
  var forProject = detectWho();
  var properties={"@type" : "sc:Range", "forProject":forProject};
  //this will be superfluous when the annotation store has ranges from other projects
  var url="http://localhost:8080/brokenBooks/getAnnotationByPropertiesServlet";
  var params = {"content" : JSON.stringify(properties)};
  //console.log("GET RANGES LIVE");
  $.post(url, params, function(data){
     //console.log("Got ranges");
     rangeCollection = JSON.parse(data);
     getAllCanvases();
  });
}

/* This function can be used to circumvent the canvas and ask the server for all the canvases for a users manifest.  Right now, 1 user has 1 manifest, 1 set of annos. */
function getAllAnnotations(){
  //THERE MAY BE NO ANNOTATIONS
  var forProject = detectWho();
  var properties={"@type" : "sc:AnnotationList", "forProject" : forProject};
  //this will be superfluous when the annotation store has lists from other projects
  var url="http://localhost:8080/brokenBooks/getAnnotationByPropertiesServlet";
  var properties={"@type" : "sc:AnnotationList"};
  var params = {"content" : JSON.stringify(properties)};
  $.post(url, params, function(data){
     annotationLists = JSON.parse(data);
     //console.log("Got annotations");
     organizeRanges();
  });
}

/* This function can be used to circumvent the canvas and ask the server for all the canvases for a users manifest.  Right now, 1 user has 1 manifest. */
function getAllCanvases(){
  //THERE WILL AT LEAST BE 2 CANVASES
    manifestCanvases = manifest.sequences[0].canvases;
    var forProject = detectWho();
    var properties={"@type" : "sc:Canvas", "forProject":forProject};
    var url="http://localhost:8080/brokenBooks/getAnnotationByPropertiesServlet"
    var params = {"content" : JSON.stringify(properties)};
    $.post(url, params, function(data){
       manifestCanvases = JSON.parse(data);
       //console.log("got canvases");
       getAllAnnotations();
    });
}

function changeLabel(range, paginate, event){
    var currentLabel = $("div[rangeid='"+range+"']").children("span:first").html().replace("<br>", "");
    var labelConfirm = $("<div style='padding: 11px 13px; height:100px; display:block; width:auto;' class='labelConfirm helPop' lblrange='"+range+"'>\n\
       <div style='position: relative; top:0px; left:0px; ' class='popHdr'>Change Label</div>\n\
       <div class='demoContent'>\n\
       <input style='margin-bottom: 5px; width: 156px; margin-left: 3px;'  class='newLabel' type='text' placeholder='"+currentLabel+"'/> <br>\n\
       <input value='Save' type='button' onclick=\"updateLabel('"+range+"', '"+currentLabel+"');\" />\n\
       <input value='Cancel' type='button' onclick='$(this).parent().parent().remove()'/></div></div>");
    var x = event.pageX;
    var y = event.pageY;
    //if($(".labelConfirm").length == 0){
      $('body').append(labelConfirm);
      labelConfirm.css({
        "left" : x+"px",
        "top" : y+"px"
      });
    //}
}

function updateLabel(range, currentLabel){
    //werid delay, fix the UI.
    var windowurl = document.location.href;
    var newLabel = $("div[lblrange='"+range+"']").find(".newLabel").val();
    if(newLabel!==undefined && newLabel !== currentLabel){
        if(newLabel === ""){
            newLabel = "unlabeled";
        }
        var updateURL ="http://localhost:8080/brokenBooks/updateRange"; //update list with the range removed
        var paramObj1 = {"@id" : range, "label" : newLabel};
        var params1 = {"content" : JSON.stringify(paramObj1)};
        if(windowurl.indexOf("demo=1") > -1){
            //$("div[lblrange='"+range+"']").html("<span class='updated'>UPDATED!</span>");
            //console.log("update "+range+" with label "+newLabel);
            $.each($(".arrangeSection[rangeid='"+range+"']"), function(){
                $(this).children("span:first").html(newLabel);
            });
           $("div[lblrange='"+range+"']").remove();
        }
        else{
           //updateInManifest("structures",paramObj1);
           $.post(updateURL, params1, function(){
               //$("div[lblrange='"+range+"']").html("<span class='updated'>UPDATED!</span>");
               //console.log("update "+range+" with label "+newLabel);
               $.each($(".arrangeSection[rangeid='"+range+"']"), function(){
                   $(this).children("span:first").html(newLabel);
               });
               $("div[lblrange='"+range+"']").remove();
           });
        }
        
    }
    
}

function toggleChildren(parentRange, admin, event){
    if(event.ctrlKey){
        if(admin === "admin"){
            changeLabel(parentRange.attr("rangeID"), false, event);
            return false;
        }
    }
    var outer= '';
    if(admin == "admin"){
        outer = $(".adminTrail");
    }
    else{
        outer = $(".popoverTrail");
    }
    //console.log("toggle children target class name: " + event.target.className);
  if(event !== undefined && event.target.className.indexOf("putInGroup") > -1 || event.target.className.indexOf("leafIcon") > -1){ //detect if they clicked the checkbox or leaf icon.
    return false;
  }
  
  if(event.target.className.indexOf("lockUp") > -1 || event.target.className.indexOf("lockDown") > -1
    || event.target.className.indexOf("lockedUp") > -1||event.target.className.indexOf("lockedDown") > -1){
      return false;
  }
  var children = [];
  if(parentRange.children(".parent").length > 0){ //if they are moving from the first set, they are parents and not children
      children = parentRange.children(".parent");
  }
  else{
      children = parentRange.children(".child");
  }
  
  var dropAttribute = "";
  var relation = parentRange.attr("rangeID");
  var unassigned = parentRange.hasClass('unassigned');
  var intendedDepth = -1;
  var newAreaLabel = parentRange.children("span:first").html();
  if(newAreaLabel == "Unassigned"){
    var extra = parentRange.parent().children(".rAreaLabel").html();
    newAreaLabel = "Unordered Leaves From <br>"+extra;
  }
  var labelHTML = '<div class="rAreaLabel">'+newAreaLabel+'</div>';
  var actualDepth = parseInt(outer.find(".rangeArrangementArea").length);
  var sortOrder = "";
  var extraButtons = '<input class="makeGroup" value="merge" type="button" onclick="askForNewTitle($(this).parent());"/>\n\
                    <input class="addGroup" value="add" type="button" onclick="newGroupForm($(this).parent());"/>\n\
                    <input class="makeSortable" value="sort" type="button" onclick="makeSortable($(this).parent());"/>\n\
                    <input class="doneSortable" value="done" type="button" onclick="stopSorting($(this).parent());"/>';
  if(admin === "admin"){
      dropAttribute = "ondragover='dragOverHelp(event);' ondrop='dropHelp(event);'";
      sortOrder = " sortOrder";
  }
  else{
      sortOrder = "";
      dropAttribute = "";
  }
  if(unassigned){
    intendedDepth = parseInt(parentRange.parent().attr("depth")) + 1;
  }
  else{
    intendedDepth = parseInt(parentRange.parent().parent().attr("depth")) + 1;
  }
  var newArea = $("<div depth='"+intendedDepth+"' relation='"+relation+"' rangeID='"+relation+"' class='rangeArrangementArea'>"+labelHTML+"<div "+dropAttribute+" class='notBucket'></div></div>");
  var newAreaBucket = $('<div onclick=\'toggleChildren($(this), "admin", event);\' '+dropAttribute+' rangeID="'+relation+'"" class="arrangeSection parent unassigned '+sortOrder+'"><span>Unassigned</span></div>'+extraButtons);
  newArea.append(newAreaBucket);
  //newArea.disableSelection();
  var existingInCopy = [];
  var leafCount = 0;
  $.each(children, function(){
    var rangeID2 = $(this).attr("rangeID");    
    if($.inArray(rangeID2, existingInCopy) == -1){
        existingInCopy.push(rangeID2);
        var child = $(this).clone();
        if (admin == "admin"){
            var childID = child.attr('id');
            childID = childID.replace("_tmp", "");
            child.attr('id', childID);
        }
      
      
       
//       if(leaf == "true"){ //put leaves into the bucket.  We need to design a 'ordered' vs 'unordered' tag to check for here since I cannot tell just from the range array whether or not it is ordered. 
//            leafCount += 1;
//            newArea.find('.unassigned').append(child);
//       }
//       else{
//         
//       }
       newArea.find('.notBucket').append(child);
//$('.rangeArrangementArea:first').find('.unassigned').removeClass("selectedSection");
    }
  });
//  var leafCountHTML = $("<span class='folioCount'><span class='countInt'>"+folioCount+"</span><img class='pageIcon' src='http://localhost:8080/brokenBooks/images/b_page.png'/></span>");
//  if(admin == "admin"){
//     newArea.children(".unassigned").append(leafCountHTML);
//  }
  if(outer.find("div[depth='"+intendedDepth+"']").length == 0){ //If the area does not exist, then add it to the arrange tab. 
    outer.append(newArea);
    if(unassigned){
        parentRange.parent().find(".selectedSection").removeClass("selectedSection");
    }
    else{
       parentRange.parent().parent().find(".selectedSection").removeClass("selectedSection");
    }
    parentRange.addClass("selectedSection");
   
  }
  else{ //if the are already exists
    if(intendedDepth == actualDepth && outer.find("div[depth='"+intendedDepth+"']").attr("relation") !== relation){ //if the area is a child from the same depth...
      var objectArray1 = [];
      $.each(outer.find("div[depth='"+intendedDepth+"']").children('.notBucket').children('.child'),function(){
        objectArray1.push($(this));
      });
      $.each(outer.find("div[depth='"+intendedDepth+"']").children('.unassigned').children('.child'),function(){
        objectArray1.push($(this));
      });     
      var thisDepth = parseInt(intendedDepth) - 1;
      
      var sectionToMoveTo = outer.find("div[depth='"+ thisDepth +"']").find('.selectedSection');
      
      sectionToMoveTo.children('.child').remove();
      for(var y=0; y<objectArray1.length; y++){
        var thisChild1 = objectArray1[y];
        var id1 = thisChild1.attr('id')+"_tmp";
        thisChild1.attr("id", id1);
        sectionToMoveTo.append(thisChild1);
        thisChild1.hide();
      }
      outer.find("div[depth='"+intendedDepth+"']").remove(); //remove the depth and call again to add the new area
      if(unassigned){
          parentRange.parent().find(".selectedSection").removeClass("selectedSection");
      }
      else{
          parentRange.parent().parent().find(".selectedSection").removeClass("selectedSection");
      }
      toggleChildren(parentRange, admin, event);
      //return false;
    }
    else if (intendedDepth < actualDepth){
      for(var i = actualDepth; i > intendedDepth-2; i--){
        var deepest = outer.find("div[depth='"+i+"']");
        var children = [];
        if(i == intendedDepth - 1){
          parentRange.click();
        }
        else{
          if(deepest.find(".arrangeSection").length == 0){ //a leaf is highlighted in the previous section
            // do nothing
          }
          else if (deepest.children(".notBucket").children(".arrangeSection").length ==0 && deepest.children(".unassigned").length == 1){ //The only thing here is unassigned. 
            if(deepest.children(".selectedSection").length > 0){//unassigned is highlighted.  Click it.
              deepest.find(".selectedSection").click();
            }
            else{ //unassigned is not highlighted, which means we dont have to click it.
              //do nothing
            }

          }
          else if(deepest.children(".unassigned").length == 0){ //these are a collection of unassigned from the next depth
            if(deepest.find(".selectedSection").length > 0){
              deepest.find(".selectedSection").click();
            }
          }
          else{ //a normal open section.  
            if(deepest.find(".selectedSection").length == 0){
              //do nothing
            }
            else if(deepest.find(".selectedSection").attr("class").indexOf("unassigned") > -1){ //the bucket is highlighted.
              deepest.find(".selectedSection").click();
              //do nothing
            }
            else{// it is an open section.  Click it.
              deepest.find(".selectedSection").click();
            }
          }
        }
      } // end for
    }
    else{ //if the area clicked was the one already highlighted or the admin interface is not necessary
        var objectArray2 = [];
        $.each(outer.find("div[depth='"+intendedDepth+"']").children('.notBucket').children('.child'), function(){
          objectArray2.push($(this));
        });
        $.each(outer.find("div[depth='"+intendedDepth+"']").find('.unassigned').children('.child'), function(){
          objectArray2.push($(this));
        });
        if(parentRange.hasClass("selectedSection")){
            parentRange.removeClass("selectedSection");
            if(unassigned){
                if(admin !== "admin"){
                    //makes the bucket the selected section.  we will want this back, for now we are hiding the unassigned areas.
                  //parentRange.parent().find(".unassigned").addClass("selectedSection");
                }
            }
            else{
                if(admin !== "admin"){
                    //makes the bucket the selected section.  we will want this back, for now we are hiding the unassigned areas.
                   //parentRange.parent().parent().find(".unassigned").addClass("selectedSection");
                }
            }
        }
        else{
            if(unassigned){
                parentRange.parent().find(".selectedSection").removeClass("selectedSection");
            }
            else{
               parentRange.parent().parent().find(".selectedSection").removeClass("selectedSection");
            }
            parentRange.addClass("selectedSection");
        }
     
        $.each(outer.find("div[depth]"),function(){
          if(parseInt($(this).attr("depth")) >= intendedDepth){//remove the depth and the greater ones open.
              $(this).remove();
          }
        });
        parentRange.children('.child').remove();
        for(var x=0; x<objectArray2.length; x++){
          var thisChild2 = $(objectArray2[x]);
          var id2 = thisChild2.attr('id')+"_tmp";
          thisChild2.attr("id", id2);
          parentRange.append(thisChild2);
          thisChild2.hide();
        }
    }
  }
  if(admin === "admin"){
    newArea.children('.notBucket').children('.child').show(); //show sections and leaves
    if(unassigned){ /* Its a special situation if we clicked the bucket of an area.  We want to show the children from the bucket outside of an unassigned object.   */
      var moveUP = newArea.find('.unassigned').children(".child");
      newArea.children('.notBucket').append(moveUP);
      newArea.children('.notBucket').children(".child").show();
      newArea.children(".unassigned").remove();
      newArea.children(".makeSortable").hide();
      newArea.children(".doneSortable").hide();
      newArea.children(".addGroup").hide();
    }
    if(newArea.children('.notBucket').children('.child').length == 0){
      //newAreaBucket.attr("onclick", "");
      if(newArea.children('.unassigned').children('.child').length === 0){
        newArea.children(".notBucket").append('<div class="nomore">No Subsections Available</div>');
        newAreaBucket.hide();
        if(parentRange.attr("leaf") !== "true" && !unassigned ){
          newArea.children(".addGroup").attr("style", "display: inline-block;");
        }
        else{
          newArea.children(".addGroup").hide();
        }
      }
      else{
        newAreaBucket.show();
      }
      newArea.children(".makeSortable").hide();
      newArea.children(".doneSortable").hide();
      newArea.children(".makeGroup").hide();
    }
    else{
    }
  }
  else{
    newArea.children('.notBucket').children('div').hide();
    newArea.find('input[type="button"]').remove();
    newArea.children('.notBucket').children('div').not('div[leaf="true"]').show(); //only show sections
    //do not show items in the unassigned area
    if(newArea.children('.notBucket').children('div').not('div[leaf="true"]').length == 0){
      newArea.children(".notBucket").append('<div class="nomore">No Subsections Available</div>');
      newAreaBucket.remove();
      //newAreaBucket.attr("onclick", "");
    }
    else{
      if(newArea.children('.selectedSection').length == 0){
          //makes the bucket the selected section.  we will want this back, for now we are hiding the unassigned areas.
        //newArea.children('.unassigned').addClass("selectedSection");
      }
    }    
  } 
}

function dragEnd(event){
    $( event.dragProxy ).remove();
//    $(".dragThis").animate({
//            top: event.offsetY,
//            left: event.offsetX,
//            opacity: 1
//    })
    $(".dragCover").remove();
    $(".dragHelper").remove();
    
}

function dragHelp(event){
    //http://www.kryogenix.org/code/browser/custom-drag-image.html
    event.dataTransfer.setData("text", event.target.id);
    //console.log("drag help, here is the id: "+event.target.id);
   
}

function dropHelp(event){
    //console.log("Drop help");
    var windowURL = document.location.href;
    var targetTag = event.target.tagName;
    var targetClass = event.target.className;
    var target = undefined;
    var dropIntoBucket = false;
    if(targetTag == "SPAN" || targetTag.indexOf("INPUT")>-1){
        var eventParent = "";
        if(targetClass.indexOf("countInt")>-1){
            eventParent = event.target.parentNode.parentNode;
        }
        else{
            eventParent = event.target.parentNode;
        }
        target = eventParent;
    }
    else{
        target = event.target;
    }
  
    var outer = $(target).closest(".arrangeTrail");
    //console.log("Drop target");
    //console.log(target);
    event.preventDefault();
    var data = "";
    data = event.dataTransfer.getData("text");
    var droppedClass = outer.find($("#"+data)).attr("class");
    var areaTakenFrom = outer.find($("#"+data)).parents(".rangeArrangementArea").attr("rangeID");
    var areaTakenFromDepth = parseInt(outer.find($("#"+data)).parents(".rangeArrangementArea").attr("depth"));
    var relation = target.getAttribute('rangeid');
    var targetClass = target.className;
    var areaDroppedTo = $(target).parents(".rangeArrangementArea").attr("rangeID");
    var areaDroppedToDepth = parseInt($(target).parents(".rangeArrangementArea").attr("depth"));
    var child = document.getElementById(data);
    if(child === null || child === undefined) return false;
    if(target.getAttribute("leaf") === "true"){
        alert("You cannot drop into a leaf");
        return false;
    }
    if(target.parentNode.className.indexOf("ordered") > -1){
        //cannot drop into locked leaves
        //console.log("cannot drop into locked leaves");
        alert("You cannot drop into a set of locked leaves");
        return false;
    }
    if(targetClass.indexOf("selectedSection") > -1 || droppedClass.indexOf("selectedSection") > -1){
        //cannot drop into a selected section, cannot drop a selected section
        alert("You cannot drag and drop or drop into opened sections.");
        return false;
    } 
    if(targetClass.indexOf("ordered")>-1){
        //cannot drop into locked leaves parent range
        alert("You cannot drop into a set of locked leaves");
        return false;
    }
    if(targetClass.indexOf('notBucket') > -1){
      if($(target).closest(".rangeArrangementArea").attr("depth") === "1" && $("#"+data).attr("leaf") === "true"){
          //cannot drop leaves into the top level structure. 
          alert("You cannot drop leaves into the top level");
          return false;
      }
      child.style.display = "block";  
    }
    else{
      child.id = child.id+"_tmp"; 
      child.style.display = "none";
      if(targetClass.indexOf('unassigned') > -1){
          areaDroppedTo = "unassigned";
      }
    }
    var append = true;
    if(target.id === data || target.id === data+"_tmp"){
        child.id = child.id.replace("_tmp", "");
        child.style.display = "block";
        append = false;
    }   
    else if(areaDroppedTo == areaTakenFrom){//dont append to self or same section
      if(target.className.indexOf("notBucket") > -1){
        append = false;
      }
    }
    else{
      for (var i = 0; i < target.childNodes.length; i++) {
        if(target.childNodes[i].id+"_tmp" == child.id || target.childNodes[i].id == child.id ) { //prevent dropping into same column or on self
          append = false;
          child.id = child.id.replace("_tmp", "");
          child.style.display = "block";
        }    
      } 
    }
//    console.log("Append?");
//    console.log(append);
    if(append){
        child.setAttribute("relation", relation);
        target.appendChild(child);
        //make the target flash
        dropFlash($(target));
        var targetID= "";
        if(target.className.indexOf("notBucket") > -1){
              targetID = target.parentNode.getAttribute("rangeid");
          }
          else{
              targetID = target.getAttribute("rangeid");
          }
        updateRange(targetID, child.getAttribute("rangeid"), ""); //do not put the append flag, the following code handles that.
      
      if(windowURL.indexOf("demo=1") === -1){
//          console.log("move "+child.getAttribute("rangeid"));
//          console.log("from "+areaTakenFrom);
//          console.log("to "+target.getAttribute("rangeid"));
          var toTarget = "";
          if(target.className.indexOf("notBucket") > -1){
//              console.log("class name is notBucket.  Get parent");
//              console.log(target.parentNode.getAttribute("rangeid"));
              toTarget = target.parentNode.getAttribute("rangeid");
          }
          else{
//              console.log("dropped in an actual section.");
//              console.log(target.getAttribute("rangeid"));
              toTarget = target.getAttribute("rangeid");
              if(target.className.indexOf("bucket")>-1){
                  dropIntoBucket = true;
                  console.log("Drop into bucket");
              }
          }
          moveAndUpdate(child.getAttribute("rangeid"), areaTakenFrom, toTarget, dropIntoBucket);
      }
      else{
          //$("#"+data).remove();
      }
      
      child.className = child.className.replace(/\bparent\b/,'');
      if(child.className.indexOf("child")==-1)child.className = child.className+" child";
      
    //There has been a change, reset the folio counts.  FIXME: Does not decrement with the area where the leaf was taken from, need to make this smarter.
     //There has been a change, reset the folio counts.  FIXME: Does not decrement with the area where the leaf was taken from, need to make this smarter.
         $.each($(".arrangeSection").not(".selectedSection"), function(){
            var folioCount = $(this).find("div[leaf='true']").length;
            var folioCountHtml = $(this).find(".folioCount");
            var leafURL = $(this).attr("rangeID");
            if($(this).attr("leaf") !== "true" && $(this).attr("isOrdered") !== true){
                folioCountHtml.find(".countInt").html(folioCount);
            }
            else if($(this).attr("leaf") === "true"){
                var leafIsInURL = $(this).parents(".rangeArrangementArea").attr("rangeID");
                var new_folioCountHtml = $("<span onclick=\"existing('"+leafURL+"','"+leafIsInURL+"')\" class='folioCount'><img class='leafIcon' src='http://localhost:8080/brokenBooks/images/leaf.png'/></span>");
                folioCountHtml.replaceWith(new_folioCountHtml);
            }

       });
       
        if(areaDroppedToDepth < areaTakenFromDepth){
            var targetCount = 1;
            if($(child).attr("leaf")!=="true"){
                targetCount = parseInt($(child).find(".folioCount").children(".countInt").html());
            }
            $.each($(".selectedSection"), function(){
                if(parseInt($(this).parents("div[depth]").attr("depth")) >= areaDroppedToDepth 
                && parseInt($(this).parents("div[depth]").attr("depth")) < areaTakenFromDepth
                && $(this).attr("leaf")!=="true" && $(this).attr("isOrdered") !== "true"){
                    var folioCount = $(this).children(".folioCount").children(".countInt").html();
                    folioCount = parseInt(folioCount) - targetCount;
                    var folioCountHTML = $(this).children(".folioCount");
                    folioCountHTML.children(".countInt").html(folioCount);
                }
            });
        }
       //console.log("area taken from depth: "+areaTakenFromDepth);
       if(outer.find($("div[depth='"+areaTakenFromDepth+"']")).children(".notBucket").children(".arrangeSection").length === 0){
        outer.find($("div[depth='"+areaTakenFromDepth+"']")).children(".makeSortable").hide();
        outer.find($("div[depth='"+areaTakenFromDepth+"']")).children(".doneSortable").hide();
         //newArea.children(".addGroup").hide();
      }
      else{
        outer.find($("div[depth='"+areaTakenFromDepth+"']")).children(".makeSortable").show();
        //$("div[depth='"+areaTakenFromDepth+"']").children(".doneSortable").show();
         //newArea.children(".addGroup").show();
      }
    }
    else{
      event.preventDefault();
      return false;
    }    
}

function dropFlash($elem){
    if($elem.attr("class").indexOf("notBucket") === -1){
        $elem.addClass("dropColor");
    }
    $elem.effect("bounce", {}, 400);
    setTimeout(function(){
        $elem.removeClass("dropColor");
    }, 400);
}

function moveAndUpdate(rangeMoved, rangeMovedFrom, rangeMovedTo, bucketBoolean){
    //Remove rangeMoved from rangeMovedFrom's range list
    //console.log("move and update with "+rangeMoved, rangeMovedFrom, rangeMovedTo)
    var getURL = "http://localhost:8080/brokenBooks/getAnnotationByPropertiesServlet";
    var paramObj = {"@id" : rangeMovedFrom};
    var params = {"content" : JSON.stringify(paramObj)};
    //console.log("First get range moved from data to remove range being moved from its ranges list.");
    $.post(getURL, params, function(data){
        var data = JSON.parse(data);
        var range = data[0];
        var rangeList = range.ranges;
        //console.log("original range list");
        //console.log(rangeList);
        var index = $.inArray(rangeMoved, rangeList);
        if(index > -1){
            //console.log("range in range list, splicing out.");
            rangeList.splice( index, 1 );
        }
         var updateURL ="http://localhost:8080/brokenBooks/updateRange"; //update list with the range removed
         var paramObj1 = {"@id" : rangeMovedFrom, "ranges" : rangeList};
         var params1 = {"content" : JSON.stringify(paramObj1)};
         //console.log("you have spliced the range out, now update with list");
         //console.log(rangeList);
         //updateInManifest("structures",paramObj1);
         $.post(updateURL, params1, function(){
             //update list where range being moved was droped
             //console.log("now we need the range list of the range Moved To");
            var paramObj2 = {"@id" : rangeMovedTo};
            var params2 = {"content" : JSON.stringify(paramObj2)};
            $.post(getURL, params2, function(data2){
                var data2 = JSON.parse(data2);
                var range2 = data2[0];
                var rangeList2 = range2.ranges;
                //console.log("original list 2");
                //console.log(rangeList2);
                if($.inArray(rangeMoved,rangeList2) === -1){
                    //console.log("Push to it");
                    rangeList2.push(rangeMoved);
                   // console.log(rangeList2);
                }                               
                //console.log("Update the range moved to ranges with the new list");
                var paramObj3 = {"@id" : rangeMovedTo, "ranges" : rangeList2};
                var params3 = {"content" : JSON.stringify(paramObj3)};
                //update list where range being moved was droped
                //updateInManifest("structures",paramObj3);
                $.post(updateURL, params3, function(){
                    //update within of ranged dropped to the rangeID it was dropped into
                    //console.log("update within of range moved to be within the range it was moved to");
                    //console.log(rangeMoved, rangeMovedTo);
                    if(bucketBoolean)rangeMovedTo="bucket";
                    var paramObj4 = {"@id":rangeMoved, "within":rangeMovedTo};
                    var params4 = {"content":JSON.stringify(paramObj4)};
                    //updateInManifest("structures",paramObj4);
                    $.post(updateURL, params4, function(){

                    });
                    
                });
            });
         });
    });
}
function dragOverHelp(event){
    event.preventDefault();
}

/* This can be used to gather ranges on server outside the manifest object.  For now, range collection is set off the manifest object strucutres array. */
function gatherRangesForArrange(which, username){
    //console.log("gather ranges "+which);
    var windowurl = document.location.href;
    var forProject = detectWho();
    var properties={"@type" : "sc:Manifest", "forProject":forProject};
    //this will be superfluous when the annotation store has ranges from other projects
    var url="http://localhost:8080/brokenBooks/getAnnotationByPropertiesServlet";
    var params = {"content" : JSON.stringify(properties)};
    if(windowurl.indexOf("demo=1") > -1){
        rangeCollection = testManifest.structures;
        manifestCanvases = testManifest.sequences[0].canvases;
        populateRangesToDOM(which);
    }
    else{
        if(which !== 1){
            console.log("Please wait while we sync the server data to the manifest...");
            $(".mainBlockCover").show();
            $("#syncNotice").show();
            syncData(username, url, params, which);
        }
    }
}

function syncData(username, url ,params, which){
    var url2 = "http://localhost:8080/brokenBooks/getManifest";
    var params2 = {"username":username};
    $.post(url2, params2)
    .done(function(data){
        var server_data = JSON.parse(data);
        var serverSequence = server_data.sequences[0];
        var serverStructures = server_data.structures;
        manifestCanvases = serverSequence.canvases; //from server, not manifest
        rangeCollection = serverStructures; //from server, not manifest
        populateRangesToDOM(which);
        $.post(url, params)
        .done(function(data){
            var manifest_data = JSON.parse(data);
            manifest = manifest_data[0]; //specifically manifest
            manifestID = manifest["@id"];
            $("#manURL").html(manifestID);
            publish(); //sync everything at the beginning
        });
    });
    
}

/* 
 * The goal here is to have a 'Publish' function, from which the sequence of the structure will produce
 * a hard-ordered sequence of the manifest.sequence[0].  

 * manifestCanvases: This is the global variable holding manifest.structures[0].  It should be unaltered based 
 * on actions of this page.
 * 
 * rangeCollection: This is the global variable holding manifest.structures.  It has been altered based on
 * actions of this page, but has been kept up to date so updating off of it should be safe.
 */
function orderSeqFromStruct(){
    var parent;
    var canvases = [];

    function pushToOrderedSequence(canvas_uri, ordered_canvases){
        $.each(manifestCanvases,function(){
            if(this["@id"] === canvas_uri){
                canvases.push(this);
                return false;
            }
        });
    }

    function getParentest(rangeList){
        var parentest = {'@id': "root", label: "Table of Contents", within:"root" };
        for(var i=0; i<rangeList.length; i++){
            if(rangeList[i].within && rangeList[i].within === "root"){ 
                parentest = rangeList[i];
                break; //There can only be one range considered the ultimate aggregator.
            }
        }
        return parentest;
    }

    function pullFromStructures(uri, rangeList){
        var pull_this_out = {};
        for(var i=0; i<rangeList.length; i++){
            if(rangeList[i]["@id"] === uri){
                pull_this_out = rangeList[i];
                break;
            }
        }
        return pull_this_out;
    }

    function unflatten(flatRanges, parent) {
      var children_uris = [];
      var children = [];
      var canvas_uris = [];
      parent = typeof parent !== 'undefined' ? parent : getParentest(flatRanges);
      if(typeof parent.ranges !== 'undefined'){ 
        children_uris = parent.ranges;
      }
      if(typeof parent.canvases !== 'undefined' && parent.canvases.length!==0){
          //it is a leaf, we found it in its order, push its canvases, there will be 2.
          canvas_uris = parent.canvases;
          pushToOrderedSequence(canvas_uris[0]);
          pushToOrderedSequence(canvas_uris[1]);
      }
      for(var i=0; i<children_uris.length; i++){ //get the children in order by their @id property from the structures array
        var new_child = pullFromStructures(children_uris[i], flatRanges);//Remember from earlier, if this was an empty child, we wanted to skip it.  
        if(!jQuery.isEmptyObject(new_child)){ //check if empty
          children.push(new_child); //push to our array if not empty
        }
      }
      if ( children.length ) {
        jQuery.each(children, function( index, child ){unflatten(flatRanges, child);});
      }
    }
    unflatten(rangeCollection);
    manifestCanvases = canvases;
    return canvases;
}

/* 
 * Set all the manifest level information to the manifest level object for the user
 */
function publish(){
    console.log("publish pending...");
    $(".mainBlockCover").show();
    $("#syncNotice").show();
    var orderedCanvases = orderSeqFromStruct();
    var sequenceObj = {
        "@id" : "http://localhost:8080/brokenBooks/sequence/normal",
        "@type": "sc:Sequence",
        "label" : "Manifest Sequence",
        "canvases" : orderedCanvases
    };
    //var label = manifest.label;
    var properties = {"@id":manifestID, "structures":rangeCollection, "sequences":[sequenceObj]}; //, "label":label
    var updateURL = "http://localhost:8080/brokenBooks/updateRange";
    var params = {"content" : JSON.stringify(properties)};
    $.post(updateURL, params)
    .done(function(){
        console.log("publish succcess, data synced.");
        $("#syncNotice").hide();
        $(".mainBlockCover").hide();
    })
    .fail(function(){
        console.log("publish fail, data not synced.");
    });
}

function populateRangesToDOM(which){
    var existingRanges = [];
    var uniqueID = 0;
    var outer = "";
    var placedInUnassigned = false;
    if(which == 1){
        //console.log("populate popover trail");
        outer = $(".popoverTrail");
    }
    else if (which == 2){
        //console.log("populate admin trail");
        outer = $(".adminTrail");
    }
    for(var i = 0; i<rangeCollection.length; i++){
        uniqueID += 1;
        var outerRange = rangeCollection[i]; //We have to look at each range, so at some point each range is the outer range...
        var outerRangeLabel = rangeCollection[i].label+" <br>";
        var existingRangeToUpdate = ""; 
        var tag = "parent";
        var relation = "";
        var isLeaf = false;
        var admin = "";
        var isOrdered = rangeCollection[i].isOrdered; //NEED TO DESIGN THIS TAG IN THE OBJECT
        var currentRange = "";
        var dragAttribute = "id='drag_"+uniqueID+"_tmp' draggable='true' ondragstart='dragHelp(event);' ondragend='dragEnd(event);'";
        var dropAttribute = " ondragover='dragOverHelp(event);' ondrop='dropHelp(event);'";
        var canvases = rangeCollection[i].canvases;
        var checkbox = "<input class='putInGroup' type='checkbox' />";
        var rightClick = "oncontextmenu='breakUpConfirm(event); return false;'";
        var lockStatusUp = rangeCollection[i].lockedup;
        var lockStatusDown = rangeCollection[i].lockeddown;
        var lockitup = "";
        var lockitdown = "";
        var lockit = "";

        if(rangeCollection[i].parent && rangeCollection[i].parent.indexOf("paggr")>-1 || rangeCollection[i]["@id"].indexOf("parent_aggr") > -1){ 
          tag = "parent pAggr";
          outerRangeLabel = "";
          bucketID = rangeCollection[i]["@id"];
          $("div[rangeid='bucket']").attr("rangeid",rangeCollection[i]["@id"]);
        }
        relation = rangeCollection[i]["@id"];

        if(which === 2){
            tag += " sortOrder";
            admin = "admin";
            checkbox = "<input class='putInGroup' type='checkbox' />";
        }
        else{
          dragAttribute = "";
          dropAttribute = "";
          rightClick = "";
          checkbox = "";
        }
        if(canvases!==undefined && canvases.length !== 0){
          isLeaf = true;
          tag="child";
          dropAttribute = "";
          if(which == 2){
            if(lockStatusUp!==undefined && lockStatusUp==="true"){
                lockitup = "<div class='lockedUp' onclick=\"unlock('"+relation+"','up',event);\"> </div>";
                dragAttribute = "id='drag_"+uniqueID+"_tmp' draggable='false' ondragstart='dragHelp(event);' ondragend='dragEnd(event);'";
                //console.log("outer with lock status, not draggable");
            }
            else{
                lockitup = "<div class='lockUp' onclick=\"lock('"+relation+"','up',event);\"> </div>";
            }
            if(lockStatusDown!==undefined && lockStatusDown==="true"){
                lockitdown = "<div class='lockedDown' onclick=\"unlock('"+relation+"','down',event);\"> </div>";
                dragAttribute = "id='drag_"+uniqueID+"_tmp' draggable='false' ondragstart='dragHelp(event);' ondragend='dragEnd(event);'";
                //console.log("outer with lock status, not draggable");
            }
            else{
                lockitdown = "<div class='lockDown' onclick=\"lock('"+relation+"','down',event);\"> </div>";
            }
            lockit = lockitup + lockitdown;
        }
          //checkbox = "";
        }
        else{
          isLeaf = false;
          // dragAttribute = "";
          // dropAttribute = " ondragover='dragOverHelp(event);' ondrop='dropHelp(event);'";
        }
        if(isOrdered === "true"){
            currentRange = $("<div class='arrangeSection ordered child' isOrdered='"+isOrdered+"' "+dragAttribute+" rangeID='"+relation+"'></div>");
        }
        else{
            currentRange = $("<div isOrdered='"+isOrdered+"' "+dropAttribute+" "+dragAttribute+" "+rightClick+" leaf='"+isLeaf+"' onclick=\"toggleChildren($(this), '"+admin+"', event);\" class='arrangeSection "+tag+"' rangeID='"+relation+"'><span>"+outerRangeLabel+"</span> "+checkbox+" "+lockit+"  </div>");
        }
        if($.inArray(rangeCollection[i]["@id"], existingRanges) == -1){
          existingRanges.push(rangeCollection[i]["@id"]);
          if(isLeaf){
            allLeaves.push(rangeCollection[i]);
            //if(rangeCollection[i].parent !== undefined){
                //console.log("Put in unassigned."); 
                outer.find(".rangeArrangementArea").find('.unassigned').append(currentRange);
                var oldFolioCount = parseInt(outer.find(".rangeArrangementArea").find('.unassigned').find(".folioCount").find(".countInt").html());
                oldFolioCount = oldFolioCount+1;
                outer.find(".rangeArrangementArea").find('.unassigned').find(".folioCount").find(".countInt").html(oldFolioCount);
            }
            else{
              outer.find(".rangeArrangementArea").find('.notBucket').append(currentRange);
            }
          //}
        }
        else{
          //dragAttribute = "id='drag_"+uniqueID+"localhost:8080' draggable='true' ondragstart='dragHelp(event);'";
          currentRange = outer.find(".arrangeSection[rangeID='"+rangeCollection[i]["@id"]+"']");
        }
        //Create an html range object that can be added
        var innerRanges = rangeCollection[i].ranges;       
        if(innerRanges.length > 0){ //If there are inner ranges
            var tag2 = "child";
            if(which === 2){
                tag2 += " sortOrder";
            }
            for(var j = 0; j<innerRanges.length;j++){ //go over each inner range
                uniqueID += 1;
                dragAttribute = "id='drag_"+uniqueID+"_tmp' draggable='true' ondragstart='dragHelp(event);' ondragend='dragEnd(event);'";
                var thisRange = innerRanges[j];

                var lockitup2 = "";
                var lockitdown2 = "";
                var lockit2 = "";
                var isLeaf2 = false;
                $.each(rangeCollection, function(){ //check each range in the collection
                    if(this["@id"] === thisRange){ //find the object by ID among the collection.  When you find it, gets its information.
                        var thisLabel = this.label;
                        var thisCanvases = this.canvases;
                        var thisIsOrdered = this.isOrdered;
                        var checkbox2 = "<input class='putInGroup' type='checkbox' />";
                        var lockStatusUp2 = this.lockedup;
                        var lockStatusDown2 = this.lockeddown;
                        if(thisCanvases!==undefined && thisCanvases.length !== 0){
                            isLeaf2 = true;
                            dropAttribute = "";
                            if(which==2){
                              if(lockStatusUp2!==undefined && lockStatusUp2==="true"){
                                  //console.log("inner with lock status, not draggable");
                                  lockitup2 = "<div class='lockedUp' onclick=\"unlock('"+this['@id']+"','up',event);\"> </div>";
                                  dragAttribute = "id='drag_"+uniqueID+"_tmp' draggable='false' ondragstart='dragHelp(event);' ondragend='dragEnd(event);'";
                              }
                              else{
                                  lockitup2 = "<div class='lockUp' onclick=\"lock('"+this['@id']+"','up',event);\"> </div>";
                              }
                              if(lockStatusDown2!==undefined && lockStatusDown2==="true"){
                                  //console.log("inner with lock status, not draggable");
                                  lockitdown2 = "<div class='lockedDown' onclick=\"unlock('"+this['@id']+"','down',event);\"> </div>";
                                  dragAttribute = "id='drag_"+uniqueID+"_tmp' draggable='false' ondragstart='dragHelp(event);' ondragend='dragEnd(event);'";
                              }
                              else{
                                  lockitdown2 = "<div class='lockDown' onclick=\"lock('"+this['@id']+"','down',event);\"> </div>";
                              }
                              lockit2 = lockitup2 + lockitdown2;
                            }
                        }
                        else{
                          isLeaf2 = false;
                          dropAttribute = " ondragover='dragOverHelp(event);' ondrop='dropHelp(event);'";
                        }
                        if(which == 1){
                          dropAttribute = "";
                          dragAttribute = "";
                          rightClick = "";
                          checkbox2 = "";
                        }
                        var embedRange = "";
                        if(thisIsOrdered === "true"){                          
                            embedRange = $("<div class='arrangeSection ordered child' isOrdered='"+thisIsOrdered+"' "+dragAttribute+" rangeID='"+this['@id']+"'></div>");
                        }
                        else{
                            embedRange = $("<div isOrdered='"+thisIsOrdered+"' "+dragAttribute+" "+dropAttribute+" "+rightClick+" onclick=\"toggleChildren($(this), '"+admin+"', event);\" class='arrangeSection "+tag2+"' leaf='"+isLeaf2+"' relation='"+relation+"' rangeID='"+this['@id']+"'><span>"+thisLabel+"</span> "+checkbox2+" "+lockit2+"</div>"); //Create an html range object for the inner range.
                        }
                        if($.inArray(this["@id"], existingRanges) == -1){
                            if(isLeaf2 && rangeCollection[i].parent !== undefined){ //we need to put this leaf into the unassigned area
                                var oldFolioCount = parseInt(outer.find(".rangeArrangementArea").find('.unassigned').find(".folioCount").find(".countInt").html());
                                oldFolioCount = oldFolioCount+1;
                                outer.find(".rangeArrangementArea").find('.unassigned').find(".folioCount").find(".countInt").html(oldFolioCount);
                                outer.find(".rangeArrangementArea").find('.unassigned').append(embedRange);
                            }
                            else{
                                currentRange.append(embedRange);
                            }
                            //$(".rangeArrangementArea").find('.notBucket').append(currentRange);
                            existingRanges.push(embedRange.attr("rangeID"));
                            if(isLeaf2){
                              allLeaves.push(this);
                            }
                        }
                        else{
                            var rangeToMove = outer.find(".arrangeSection[rangeID='"+this["@id"]+"']");
                            if(isLeaf2 && currentRange.attr("class").indexOf("pAggr") > -1 ){
                                //console.log("Leaf in paggr, remains in bucket");
                            }
                            else{
                                currentRange.append(rangeToMove);
                            /* In case of the ranges being wildly out of order, we have to make this check to assure that these children are in fact classed as a child. */
                                rangeToMove.removeClass("parent").addClass("child"); //If we have to embed it, then it is a child.  
                            }

                        }
                    } 
                });
            }
        }
        else{ //There are no inner ranges. It could be a section with no children or a leaf.  

        }
    }
    var pAggrChildren = outer.find('.pAggr').children('div');
    pAggrChildren.removeClass("child").addClass("parent");
    outer.find('.rangeArrangementArea').find('.notBucket').append(pAggrChildren);
        /* In case of the ranges being wildly out of order, we have to make this check to assure the top level nodes are considered parents. */
        //console.log("make paggr children parents");
        //console.log(pAggrChildren);
        //wont work for putInBucket.html?demo=1         
        $.each(pAggrChildren,function(){
            if($(this).attr("id") !== undefined){
                var newID = $(this).attr("id").replace("_tmp", "");
                $(this).attr("id", newID);
            }
        });
        $('.pAggr').remove();    
        //set folio counts for all sections in the admin interface, ignore leaves.
        if(which == 2){
          $.each(outer.find(".arrangeSection"), function(){
             $(this).children(".folioCount").remove();
                var folioCount = $(this).find("div[leaf='true']").length;
                var folioCountHTML = $("<span class='folioCount'><span class='countInt'>"+folioCount+"</span><img class='pageIcon' src='http://localhost:8080/brokenBooks/images/b_page.png'/></span>");
                var leafURL = $(this).attr("rangeID");
                if($(this).attr("leaf") === "true"){
                    var leafIsInURL = $(this).parent().attr("rangeID");
                    folioCountHTML = $("<span onclick=\"existing('"+leafURL+"','"+leafIsInURL+"')\" class='folioCount'><img class='leafIcon' src='http://localhost:8080/brokenBooks/images/leaf.png'/></span>");
                }
                else if($(this).attr("isOrdered") === "true"){
                    folioCountHTML="";
                }
                $(this).append(folioCountHTML);
           });
        }
        $("#saveText").html("Saving...");
        $("#saveCover").hide();
}

/*
* @params: rangeCollection: an array containing all the ranges of a project.  It is sorted so the array contains ranges from smallest to largest. 
*For now, it is a global array.  It will most likely be handed in as a parameter to the function in the future. 
*Builds the tree structure of ranges from an ordered list of ranges (by size of their ranges[] field).
*/

//Think about sorted vs. unsorted ranges. 
function organizeRanges(){
    var existingRanges = [];
    for(var i = rangeCollection.length - 1; i>=0; i--){
        var outerRange = rangeCollection[i]; //We have to look at each range, so at some point each range is the outer range...
        var outerRangeLabel = rangeCollection[i].label;
        var currentRange = $("<div class='range' rangeID='"+rangeCollection[i]["@id"]+"'><div>"+outerRangeLabel+"</div></div>");        
        if($.inArray(rangeCollection[i]["@id"], existingRanges) == -1){
          existingRanges.push(rangeCollection[i]["@id"]);
          $("#focusedRange").append(currentRange);
        }
        else{
          currentRange = $('div[rangeID="'+rangeCollection[i]["@id"]+'"]'); // get it.
        }
        //Collect the inner ranges for this range.  It will be an array(0) if there are none. 
        var innerRanges = rangeCollection[i].ranges;
        if(innerRanges.length > 0 &&  rangeCollection[i].canvases.length === 0){ //If there are inner ranges
         //console.log("Working inner ranges.")
            for(var j = 0; j<innerRanges.length;j++){ //go over each inner range
                var thisRange = innerRanges[j];
                $.each(rangeCollection, function(){ //check each range in the collection
                    if(this["@id"] === thisRange){ //find the object by ID among the collection.  When you find it, gets its information.
                        var thisLabel = this.label;
                        var embedRange = $("<div class='range' rangeID='"+this['@id']+"'><div>"+thisLabel+"</div></div>"); //Create an html range object for the inner range.
                        if($.inArray(this["@id"], existingRanges) == -1){
                          currentRange.append(embedRange);
                          existingRanges.push(this["@id"]);
                        }
                        else{
                          var rangeToMove = $(".range[rangeID='"+this["@id"]+"']");
                          currentRange.append(rangeToMove);
                        }
                    } //If you didn't find it among the collection, we can't do anything with it.  
                });
            }
        }
        /* This has becoming depricated for BB because we will not be connecting data like this.   */
        // else if(innerRanges.length ===1 &&  rangeCollection[i].canvases.length === 1){
        // //special case.  These ranges are meant to replace canvases of this leaf with fragments of this canvas.  
        // //We have made fragments atomic ranges so that pieces of the same canvas that exist in different ranges can be connected.  
        // //They will exist as their own entity on each individual leaf so that they can have their own annotation, 
        // //but they will be connected by location with the canvas no matter where it exists.  
        // //This code will be reached before the code in the else every time because of the ordered array by range field size.  
        // //Fortunately, there will only be up to two ranges in here.  Those ranges will be URI's of leaves. Therefore, we can directly grab that leaf from the array.  
        // //We can cheat a bit and start from the i we are at since we know it does not come before this one.
        //   var canvasToReplace = rangeCollection[i].canvases[0];
        //   var subStr = canvasToReplace.substring(0,canvasToReplace.indexOf("#xywh"));
        //   for(var x=0; x<i; x++){
        //     //we know there is only one
        //     var innerRangeSubstring = innerRanges[0];
        //     if(innerRanges[0].indexOf("#xywh") > -1) innerRangeSubstring = innerRanges[0].substring(0, innerRanges[0].indexOf("#xywh"));
        //     var leafRangeCanvases= rangeCollection[x].canvases;
        //     if (rangeCollection[x]["@id"] == innerRangeSubstring){
        //       //replace the canvas in the leaf range with the canvas from the inner range
        //         var l = -1;
        //         $.each(leafRangeCanvases, function(){
        //           l++;
        //           if(this == subStr){
        //             rangeCollection[x].canvases[l] = canvasToReplace;
        //           }
        //           else{ //this could be the wrong canvases OR this could be the right canvas as a fragment.  If it is the right canvas as a fragment, there can be multiple fragments of that canvas, so add it in.  Otherwise, we should do nothing.  
        //             if(this.indexOf("#xywh") > -1){
        //               //it could be a fragment
        //               var tmp = this;
        //               if(tmp.indexOf("#xywh") > -1){ //If this is not true, it isn't possible that we are on the correct canvas.
        //                 tmp = tmp.substring(0, tmp.indexOf("#xywh")); //It is at least a fragment, but for the right canvas?  Strip #xyhw=.... off the URI
        //                 tmp += ""; //cast it to a string.
        //                 var tmpCompare = leafRangeCanvases[l].substring(0,leafRangeCanvases[l].indexOf("#xywh")); //Strip #xywh off the canvas we are checking equivalency to
        //                 tmpCompare += ""; // cast to a string
        //                 if(tmpCompare == tmp && $.inArray(canvasToReplace, leafRangeCanvases) < 0){ //Then it was a new fragment for this canvas, so we can push the fragment to this leaf. 
        //                    rangeCollection[x].canvases.splice(l+1, 0, canvasToReplace);
        //                    //place canavs in at appropriate location among canvases in case there are multiple fragments.  This will build them out in the order users think they go.  
        //                 }
        //                 else{
        //                   //it was the wrong canvas.  Leave it alone.
        //                 }  
        //               }
        //             }
        //           }
        //         });
        //     }
        //     //What we have done is skipped further down into the array and altered a single canvas in a leaf. 
        // When we get to that canvas in this function, it will not have any ranges so it will skip to the code below and build out the leaf.
        //   }
        // }
        else{ //There are no inner ranges, so we must be on a leaf or a empty sections. 
            var currentCanvases = outerRange.canvases;
            var firstCanvas = currentCanvases[0];
            if(firstCanvas.indexOf("#xywh") >=0){
              firstCanvas = firstCanvas.substring(0, firstCanvas.indexOf("#xywh"));
            }
            var a = false;
            var rangeForCanvases = $("#focusedRange").find('div[rangeID="'+outerRange['@id']+'"]');
            if(rangeForCanvases.length > 0){ //if the range exists in a section
              a=true;
            }
            else{ //The leaf is a parent to itself, which means its a random page in the bucket. 
               // console.log("This is a new leaf");
              rangeForCanvases = $("<div class='range bucketPage' rangeID='"+outerRange['@id']+"'><div>"+outerRange.label+"</div></div>");
            }
            var canvasHolder1 = $("<div sideA='' class='canvas'> </div>");
            var canvasHolder2 = $("<div sideB='' class='canvas'> </div>");
            var canvasHolder3 = $("<div sideA='' class='canvas'> <img class='canvasImg' src='http://img1.wikia.nocookie.net/__cb20130607215218/mummipedia/images/b/bb/480px-Placeholder.png' /> </div>");
            var canvasHolder4 = $("<div sideB='' class='canvas'> <img class='canvasImg' src='http://img1.wikia.nocookie.net/__cb20130607215218/mummipedia/images/b/bb/480px-Placeholder.png' /> </div>");
            var side1 = true;
            var side2 = false;
            var holderToAppend = $("");
            if(currentCanvases.length > 0){
                $.each(currentCanvases, function(){ //for whatever canvases there are, if any, or many fragments
                  //console.log("Working on canvases");
                  var originalCanvas = String(this);
                  var currentCanvas = "";
                  var fragment = false;
                  var currentCanvasAnnotations = [];
                  var currentCanvasAnnotationsLists = [];
                  var canvasImg = "";
                  if(originalCanvas.indexOf("#xywh") >= 0){
                    currentCanvas = originalCanvas.substring(0, originalCanvas.indexOf("#xywh"));
                    fragment =true;
                  }
                  else{
                    currentCanvas = originalCanvas;
                    fragment = false;
                  }
                  /* Must gather this canvases annotations */
                  $.each(manifestCanvases, function(){
                      if(this["@id"] == currentCanvas){
                          currentCanvasAnnotationsLists = this.otherContent;   
                          var canvasLabel = this.label;
                          var canvasID = this["@id"];
                          if(this.images.length > 0){
                              canvasImg = this.images[0].resource["@id"];
                          }
                          else{
                              canvasImg = "http://img1.wikia.nocookie.net/__cb20130607215218/mummipedia/images/b/bb/480px-Placeholder.png";
                          }                         
                          $.each(currentCanvasAnnotationsLists, function(){
                              var annoListID2 = String(this["@id"]);
                              $.each(annotationLists, function(){
                                  if(annoListID2 == this["@id"]){
                                    currentCanvasAnnotations.push(this.resources);
                                  }
                              });
                          });
                          if(currentCanvas == firstCanvas){ //we are still on sideA
                            side1 = true;
                            side2 = false;
                            if(!fragment){
                                canvasHolder3.find('img').attr('src', canvasImg);
                                
                            }
                            canvasHolder3.prepend("<div class='canvasLabel'>"+canvasLabel+"</div>");
                            canvasHolder3.attr("canvasID", canvasID);
                          }
                          else{ //we are on sideB
                            side1=false;
                            side2 = true;
                            if(!fragment){
                                canvasHolder4.find('img').attr('src', canvasImg);
                            }
                            canvasHolder4.prepend("<div class='canvasLabel'>"+canvasLabel+"</div>");
                            canvasHolder4.attr("canvasID", canvasID);
                          }
                      }
                  });
                  
                  var XYWHarray = [0,0,0,0];
                  var XYWHsubstring = originalCanvas.substring(originalCanvas.lastIndexOf('#' + 1)); 
                  if(XYWHsubstring.indexOf('=') > -1){ //string must contain this to be valid
                      var numberArray = XYWHsubstring.substring(originalCanvas.lastIndexOf('xywh=') + 5).split(',');
                      if(numberArray.length === 4){ // string must have all 4 to be valid
                          var x = numberArray[0];
                          var y = numberArray[1];
                          var w = numberArray[2];
                          var h = numberArray[3];
                          XYWHarray = [x,y,w,h];
                      }
                      else{
                        //There is certainly something more useful we can do here. I just kill it if we do not have all the values.  
                        XYWHarray = [0,0,0,0];
                      }
                  }
                  //This part creates chunks and places them in the canvas.
                  if(fragment){
                    var fragmentHTML = $("<div class='fragment canvasinner'><img class='canvasImg' src='"+canvasImg+"' /></div>");
                     $.each(manifestCanvases, function(){
                         if(this["@id"] == currentCanvas){
                            if(this.images.length > 0){
                              fragmentHTML.find('img').attr('src', this.images[0].resource["@id"]);
                            }
                            else{
                               fragmentHTML.find('img').attr('src', "http://img1.wikia.nocookie.net/__cb20130607215218/mummipedia/images/b/bb/480px-Placeholder.png"); 
                            }
                             if(XYWHarray[2] == 0 || XYWHarray[3] == 0){ //well surely the height and width are not 0 if it is an image chunk...this is what I do if it is.
                                fragmentHTML.attr("style", "height:"+this.height+"px; width:"+this.width+"px");//set chunk height and width to canvas height and width.
                                fragmentHTML.find("img").attr("style", "top:-"+XYWHarray[1]+"px; left:-"+XYWHarray[0]+"px; ");
                                if(side1){ //put it in side1.  
                                  canvasHolder3.find('img').remove();
                                  canvasHolder3.append(fragmentHTML);
                                }
                                else{ //maybe we should check if side2 is true, but I'll just assume it
                                  canvasHolder4.find('img').remove();
                                  canvasHolder4.append(fragmentHTML);
                                }
                             }
                             else{ //the height and width of the fragment piece were not 0.
                                fragmentHTML.attr("style", "height:"+XYWHarray[3]+"px; width:"+XYWHarray[2]+"px");
                                fragmentHTML.find("img").attr("style", "top:-"+XYWHarray[1]+"px; left:-"+XYWHarray[0]+"px;");
                                if(side1){//put it in side1.
                                  canvasHolder3.append(fragmentHTML);
                                }
                                else{//maybe we should check if side2 is true, but I'll just assume it
                                  canvasHolder4.append(fragmentHTML);
                                }
                             }
                         }
                     });
                  }
                            for(var x=0; x<currentCanvasAnnotations.length; x++){
                                var annotation = $("<div class='annotation'></div>");
                                $.each(currentCanvasAnnotations[x], function(){
                                  var canvas = this.on;
                                  var XYWHarray2 = [0,0,0,0];
                                  if(canvas.indexOf("#xywh") >= 0){
                                    var XYWHsubstring = canvas.substring(canvas.lastIndexOf('#' + 1)); 
                                    if(XYWHsubstring.indexOf('=') > -1){ //string must contain this to be valid
                                        var numberArray = XYWHsubstring.substring(canvas.lastIndexOf('xywh=') + 5).split(',');
                                        if(numberArray.length === 4){ // string must have all 4 to be valid
                                            var x = numberArray[0];
                                            var y = numberArray[1];
                                            var w = numberArray[2];
                                            var h = numberArray[3];
                                            XYWHarray2 = [x,y,w,h];
                                        }
                                        else{
                                          //There is certainly something more useful we can do here. I just kill it if we do not have all the values.  
                                          XYWHarray2 = [0,0,0,0];
                                        }
                                    }
                                    annotation.attr("style", "left: "+XYWHarray2[0]+"px; top: "+XYWHarray2[1]+"px; width: "+XYWHarray2[2]+"px; height: "+XYWHarray2[3]+"px;");
                                  }
                                  if(this.resource["@type"] == "dctypes:Image"){
                                    var img = $("<img class='canvasImgFragment' src='"+this.resource["@id"]+"'/>");
                                    annotation.addClass("imgFragment").append(img);
                                  }
                                  if(this.resource["@type"] == "cnt:ContentAsText"){
                                    var text = this.resource["cnt:chars"];
                                    annotation.attr("annoText", text);
                                  }
                                  if(side1){
                                    //console.log("Append anno to holder 1");
                                    canvasHolder3.append(annotation);
                                  }
                                  else{
                                      //console.log("Append anno to holder 2");
                                    canvasHolder4.append(annotation);
                                  }
                                }); //must comment this out when running live
                            }

                           //The canvas holders must be completely built before this part.  We may need to implement a timeout for now.  
                            if(a){ //if the range exists in a section
                               // console.log("Append canvases to range.");
                              rangeForCanvases.append(canvasHolder3, canvasHolder4); //put the canvas object in the range object (the leaf)
                            }
                            else{ //the range does not exist in a section, but rather as a parent range.  Add canvas to the new leaf
                                //console.log("Append canvases to new leaf");
                              rangeForCanvases.append(canvasHolder3, canvasHolder4);
                              $("#focusedRange").append(rangeForCanvases);
                              existingRanges.push(rangeForCanvases.attr("rangeID"));
                            }
                       });
                }
                else{ // this is an empty section, do nothing, it is already appended.

                }
            }
        }
    }
/*
* Helper function for mergeSort().  It mergest the left and right arrays created when splitting the source array in the middle. 
*/
function merge(left, right){
    var result  = [],
        il      = 0,
        ir      = 0;

    while (il < left.length && ir < right.length){
        if (left[il].ranges.length < right[ir].ranges.length){
            result.push(left[il++]);
        } else {
            result.push(right[ir++]);
        }
    }

    return result.concat(left.slice(il)).concat(right.slice(ir));
}
/*
* The classic merge sort function that sorts an array of numbers from smallest to largest.  In our case, the array is an array of range objects, but what I test is the length of their ranges[] field, since those with the highest count in the ranges[] field will be top parent objects and the ordered array is easier to build the tree structure from.  Even for an array of 1000 ranges, this runs pretty quick.  
*/
function mergeSort(items){
    if (items.length < 2) {
        return items;
    }

    var middle = Math.floor(items.length / 2),
        left    = items.slice(0, middle),
        right   = items.slice(middle),
        params = merge(mergeSort(left), mergeSort(right));
    
    // Add the arguments to replace everything between 0 and last item in the array
    params.unshift(0, items.length);
    items.splice.apply(items, params);
    return items;
}

function populateAnnoForms(){
        var annos = [];
        //console.log("populate anno form");
        if(zeta){
            //console.log("For leaf");
            annos = annoListCollection[2].resources;
           // console.log(typeof annos + "    1");
            if(annos.length > 0){
                if(typeof annos == "object"){
                    
                }
                else{
                    annos.replace('\"', '"');
                    annos = JSON.parse(annos);
                }
            }
        }
        else if(alpha){
            //console.log("for alpha");
            annos = annoListCollection[0].resources;           
             //console.log(typeof annos + "    2");
            if(annos.length > 0){
                if(typeof annos == "object"){
                    
                }
                else{
                    annos.replace('\"', '"');
                    annos = JSON.parse(annos);
                }
            }
        }
        else{
           // console.log("For beta");
            annos = annoListCollection[1].resources;
            // console.log(typeof annos + "    3");
            if(annos.length > 0){
                if(typeof annos == "object"){
                    
                }
                else{
                    annos.replace('\"', '"');
                    annos = JSON.parse(annos);
                }
            }
        }

        $.each($(".contextFormEntry"), function(){
            var label1 = $(this).find('.formLabel').html().replace(":", "").trim();
            label1 = label1.replace(/ *\([^)]*\) */g, ""); // replace (stuff)
            //need to get rid of trailing text between and including ()
            var currentEntry1 = $(this).find(".content");
            var row = $(this);
            if(annos && annos.length > 0){
                $.each(annos, function(){
                    var checkLabel1 = this.label.replace(":", "").trim();  
                    checkLabel1 = checkLabel1.replace(/ *\([^)]*\) */g, "");
                    //need to get rid of trailing text between and including ()
                    if (checkLabel1 == label1){
                        currentEntry1.val(this.resource["cnt:chars"]);
                        row.attr("set", "set");
                    }             
                });
            }
        });
        $.each($(".contentFormEntry"), function(){
            var label2 = $(this).find('.formLabel').html().replace(":", "").trim();
            //need to get rid of trailing text between and including ()
            label2 = label2.replace(/ *\([^)]*\) */g, "");
            var row = $(this);
            var currentEntry2 = $(this).find(".content");
            if(annos && annos.length > 0){
                $.each(annos, function(){
                    var checkLabel2 = this.label.replace(":", "").trim();
                    checkLabel2 = checkLabel2.replace(/ *\([^)]*\) */g, "");
                    //need to get rid of trailing text between and including ()
                    if (checkLabel2 == label2){
                        currentEntry2.val(this.resource["cnt:chars"]);
                        row.attr("set", "set");
                    }
                });
            }
        });
        $.each($(".carrierFormEntry"), function(){
            var label3 = $(this).find('.formLabel').html().replace(":", "").trim();
            label3 = label3.replace(/ *\([^)]*\) */g, "");
            //need to get rid of trailing text between and including ()
            var currentEntry3 = $(this).find(".content");
            var row = $(this);
            if(annos && annos.length > 0){
                $.each(annos, function(){
                    var checkLabel3 = this.label.replace(":", "").trim();
                    checkLabel3 = checkLabel3.replace(/ *\([^)]*\) */g, "");
                    //need to get rid of trailing text between and including ()
                    if (checkLabel3 == label3){
                        currentEntry3.val(this.resource["cnt:chars"]);
                        row.attr("set", "set");
                    }
                });
            }
        });
        
        if(annos && annos.length > 0){
            populateSpecialEntries(annos);
        }
    };
    
    function populateSpecialEntries(annos){
        $.each(annos, function(){
                var checkLabel3 = this.label.replace(":", "").trim();
                checkLabel3 = checkLabel3.replace(/ *\([^)]*\) */g, "");
                if(checkLabel3 == "General Metadata"){
                    $("#notes").val(this.resource["cnt:chars"]);
                    $("#notes").attr("set", "set");
                }
                else if(checkLabel3 === "Leaf Height"){
                    $("#leafHeight").val(this.resource["cnt:chars"]);
                    $("#leafHeight").attr("set", "set");
                }
                else if(checkLabel3 === "Leaf Width"){
                    $("#leafWidth").val(this.resource["cnt:chars"]);
                    $("#leafWidth").attr("set", "set");
                }
                else if(checkLabel3 === "Line Height"){
                    $("#lHeight").val(this.resource["cnt:chars"]);
                    $("#lHeight").attr("set", "set");
                }
                else if(checkLabel3 === "Line Width"){
                    $("#lWidth").val(this.resource["cnt:chars"]);
                    $("#lWidth").attr("set", "set");
                }
                else if(checkLabel3 === "Text Height"){
                    $("#tbHeight").val(this.resource["cnt:chars"]);
                    $("#tbHeight").attr("set", "set");
                }
                else if(checkLabel3 === "Text Width"){
                    $("#tbWidth").val(this.resource["cnt:chars"]);
                    $("#tbWidth").attr("set", "set");
                }
                else if(checkLabel3 === "Interlinear Annotations"){
                    $("#interlinearAnnos").val(this.resource["cnt:chars"]);
                    $("#interlinearAnnos").attr("set", "set");
                }
                else if(checkLabel3 === "Marginal Annotations"){
                    $("#marginalAnnos").val(this.resource["cnt:chars"]);
                    $("#marginalAnnos").attr("set", "set");
                }
            });
    }
    /*
        Fires when user clicks to enter additional information.  This mainly changes the UI to highlight which part of the leaf the user is working on and show them the information field in the left column.  
    */
   
    function enterCatalogueInfo(canvasID, canvas){
        //must have check for undefined because the first time it loads, it will not have a class yet which just means that the code needs to run.
        var windowURL = document.location.href;
        var dontsave = false;
        var demo = false;
        if(canvasID !== "leaf" && $("div[canvas='"+canvasID+"']").attr("class") !== undefined && $("div[canvas='"+canvasID+"']").attr("class").indexOf("selectedFolio") > -1){
            //if it is not the leaf selected and the canvasID matches the canvas attribute of the side selected, then we have selected the already selected side.  get out of the function!
            //console.log("return false 1");
            return false;
        }
        if(canvasID === "leaf" && $("#oneAndtwo").attr("class")!==undefined && $("#oneAndtwo").attr("class").indexOf("selectedFolio") > -1){
            // if the canvasID is for the leaf and the leaf is selected, then we have selected the already selected side.  get out of the function!
            //console.log("return false 2");
            return false;
        }
        if($(".selectedFolio").length === 0){
            //Then it has just been loaded and folio 1 is being clicked, dont save but do the UI stuff.
            //console.log("done save it SO TRUE");
            dontsave = true;
            
        }
        if(windowURL.indexOf("demo=1") > -1){
            demo = true;
        }
            var previouslySelectedURI = "";
            if(canvas == 'recto'){
                //console.log("recto selected");
                previouslySelectedURI = $(".selectedFolio").attr("canvas");
                if($(".selectedFolio").length >0 && $(".selectedFolio").find("img:first").attr("src").indexOf("addImg.jpg") > -1){
                    //Need to show the negative
                    $(".selectedFolio").find("img:first").attr("src", "http://localhost:8080/brokenBooks/images/addImgInv.png");
                }
                if(previouslySelectedURI === "leaf"){
                    //console.log("previous was leaf1");
                    previouslySelectedURI = currentLeafServerID;
                }
                $("#folioSide1").addClass("selectedFolio");
                if($("#folioSide1").find(".rectoImg").attr("src").indexOf("addImgInv.png") > -1){
                    //Need to show the negative
                    $("#folioSide1").find(".rectoImg").attr("src", "http://localhost:8080/brokenBooks/images/addImg.jpg");
                }
                $("#folioSide2").removeClass("selectedFolio");
                $("#oneAndtwo").removeClass("selectedFolio");

                $("#folioSide1").find('i').removeClass('unselectedI').removeClass('selectedI').addClass('selectedI');
                $("#folioSide2").find('i').removeClass('unselectedI').removeClass('selectedI').addClass('unselectedI');
                $("#oneAndtwo").find('i').removeClass('unselectedI').removeClass('selectedI').addClass('unselectedI');
            }
            else if (canvas == 'verso'){
                //console.log("verso selected");
                previouslySelectedURI = $(".selectedFolio").attr("canvas");
                if($(".selectedFolio").length >0 && $(".selectedFolio").find("img:first").attr("src").indexOf("addImg.jpg") > -1){
                    //Need to show the negative
                    $(".selectedFolio").find("img:first").attr("src", "http://localhost:8080/brokenBooks/images/addImgInv.png");
                }
                if(previouslySelectedURI === "leaf"){
                    previouslySelectedURI = currentLeafServerID;
                    //console.log("previous was leaf2");
                }
                $("#folioSide2").addClass("selectedFolio");
                if($("#folioSide2").find(".versoImg").attr("src").indexOf("addImgInv.png") > -1){
                    //Need to show the negative
                    $("#folioSide2").find(".versoImg").attr("src", "http://localhost:8080/brokenBooks/images/addImg.jpg");
                }
                $("#folioSide1").removeClass("selectedFolio");
                $("#oneAndtwo").removeClass("selectedFolio");

                $("#folioSide1").find('i').removeClass('unselectedI').removeClass('selectedI').addClass('unselectedI');
                $("#folioSide2").find('i').removeClass('unselectedI').removeClass('selectedI').addClass('selectedI');
                $("#oneAndtwo").find('i').removeClass('unselectedI').removeClass('selectedI').addClass('unselectedI');
            }
            else{
                //console.log("leaf selected");
                previouslySelectedURI = $(".selectedFolio").attr("canvas");
                canvas = "leaf";
                 if($(".selectedFolio").length >0 && $(".selectedFolio").find("img:first").attr("src").indexOf("addImg.jpg") > -1){
                    //Need to show the negative
                    $(".selectedFolio").find("img:first").attr("src", "http://localhost:8080/brokenBooks/images/addImgInv.png");
                }
                $("#oneAndtwo").addClass("selectedFolio");
                $("#folioSide1").removeClass("selectedFolio");
                $("#folioSide2").removeClass("selectedFolio");

                $("#folioSide1").find('i').removeClass('unselectedI').removeClass('selectedI').addClass('unselectedI');
                $("#folioSide2").find('i').removeClass('unselectedI').removeClass('selectedI').addClass('unselectedI');
                $("#oneAndtwo").find('i').removeClass('unselectedI').removeClass('selectedI').addClass('selectedI');
            }
            if(dontsave){
                $("#saveCover").hide();
                $("#saveText").html("Saving...");
                //console.log("DONT SAVE");
            }
            else{
                //console.log("SAVE");
                saveFolio(true, canvas, previouslySelectedURI);    
            }
    }
    
    /*
    When the form information has been filled out, this function will save annotations to the appropriate canvas or leaf range. 
    Entries that create new ranges will do so, and if that range is already created and needs to be updated, it will do that. 
    It also keeps content, context and carrier information separate from each other so we can track them as such.  
    The code will skip empty fields, unless it was a field that was previously saved or populated with annos, in which case it will have an attribute "set" which is "set" to let us know to update it.
    Keeps server calls to the bare minimum when saving the form. Mirador will not populate annos whose cnt:chars is "" or undefined. 
    Combines content(), context(), carrier(), notes(), updateLabels(), savePlacement() and updateList() to gather all the information from a leaf form and update the various anno objects.
    TODO: Does not save annotations in order.  We want it to.  
    */
    function saveFolio(flag, canvas, thisFolio, leafFlag){ 
        //savePlacement();  //This can be used to also ensure the leaf is placed within the correct range.  
        if(flag === false){
            //console.log("flag was false");
            canvas = $(".selectedFolio").find(".canvasImageFile").attr("rv");
            if(canvas === "leaf"){
                //console.log("SET THIS FOLIO TO THE LEAF2: " + currentLeafServerID);
                thisFolio = currentLeafServerID;
            }
            else{
                thisFolio = $(".selectedFolio").attr("canvas");
            }
        }
        else{
            //console.log("flag was true");
            if(canvas === "leaf"){
                //console.log("SET THIS FOLIO TO THE LEAF2: " + currentLeafServerID);
                thisFolio = currentLeafServerID;
            }
        }
        
        //console.log("in save.  thisFolio = "+thisFolio);
        if(thisFolio !== undefined && thisFolio !== ''){
            //console.log("show save cover");
            $("#saveCover").show();
        }
        var windowURL = document.location.href;
        var currentLeafObject = {};
        var otherInfo = {};
        var uriToSave = thisFolio; //alpha URI, beta URI, or leaf URI
        var canvasURI = uriToSave;
        var otherInfoList = {};
//        if(windowURL.indexOf("demo=1") > -1){
//            closeLeafPopover();
//            return false;
//        }
        $.each(rangeCollection, function(){
            if (this["@id"] === uriToSave){
                currentLeafObject = this; //Set the actual leaf object if the uriToSave is a leaf uri
                return false;
            }
        });
        context(canvasURI, flag, canvas);

    }
    
    function content(canvasURI, flag, canvas){
        //console.log("content");
        var uriToSave = canvasURI;
        for(var i=0; i<$(".contentFormEntry").length; i++){
            var _this = $(".contentFormEntry")[i];
            var entryValue = $(_this).find(".content").val();
            var special = $(_this).attr("special");
            var addedInfoList1 = {};
            if(zeta){ addedInfoList1 = $("#zetaInformation").find(".contentList"); }
            else if(alpha){ addedInfoList1 = $("#alphaInformation").find(".contentList"); }
            else if(beta){ addedInfoList1 = $("#betaInformation").find(".contentList"); }
            var entryID = $(_this).find(".content").attr("id");
            var entryValue = $(_this).find(".content").val();
            var range = $(_this).find(".content").attr("range");
            range = (range !== undefined && range !== "");
            var addedInfoLabel = $(_this).find(".formLabel").html();
            addedInfoLabel = addedInfoLabel.replace(":", "");
            addedInfoLabel = addedInfoLabel.replace(/ *\([^)]*\) */g, "");
            var forProject = detectWho();
            var annotationObject = {
                "@id" : "",
                "@type" : "oa:Annotation",
                "motivation" : "oa:describing",
                "forProject" : forProject,
                "label" : "",
                "resource" : {
                  "@type" : "cnt:ContentAsText",
                  "cnt:chars" :""
                },
                "on" : canvasURI //this will be a rangeURI if uriToSave is set to the leaf uri instead of a canvasURI, which is what we want.  annotations can be saved to ranges. 
            };
            if (special === "annotations"){
                //console.log("Special Annos");
                var inter = $("#interlinearAnnos").val();
                var marginal = $("#marginalAnnos").val();
                if((inter!==undefined && inter!=="") || $("#interlinearAnnos").attr("set") === "set"){
                    var annotationObject2 = {
                        "@id" : "",
                        "@type" : "oa:Annotation",
                        "motivation" : "oa:describing",
                        "forProject" : forProject,
                        "label" : "Interlinear Annotations",
                        "resource" : {
                          "@type" : "cnt:ContentAsText",
                          "cnt:chars" :inter
                        },
                        "on" : canvasURI //this will be a rangeURI if uriToSave is set to the leaf uri instead of a canvasURI, which is what we want.  annotations can be saved to ranges. 
                    };
                    $("#interlinearAnnos").attr("set", "set");
                    createNewAnno(annotationObject2, "Interlinear Annotations", inter, addedInfoList1, uriToSave); //bulk
                }
                if((marginal!==undefined && marginal!=="") || $("#marginalAnnos").attr("set") === "set"){
                    var annotationObject3 = {
                        "@id" : "",
                        "@type" : "oa:Annotation",
                        "motivation" : "oa:describing",
                        "forProject" : forProject,
                        "label" : "Marginal Annotations",
                        "resource" : {
                          "@type" : "cnt:ContentAsText",
                          "cnt:chars" :marginal
                        },
                        "on" : canvasURI //this will be a rangeURI if uriToSave is set to the leaf uri instead of a canvasURI, which is what we want.  annotations can be saved to ranges. 
                    };
                    $("#marginalAnnos").attr("set", "set");
                     createNewAnno(annotationObject3, "Marginal Annotations", marginal, addedInfoList1, uriToSave);//bulk                      
                }
            }
            else if((entryValue !== undefined && entryValue !== "") || $(_this).attr("set") === "set"){
                annotationObject.resource["cnt:chars"] = entryValue;
                    annotationObject.label = addedInfoLabel;
                    annotationObject.resource["cnt:chars"] = entryValue;
                    $(_this).attr("set", "set");
                    createNewAnno(annotationObject, addedInfoLabel, entryValue, addedInfoList1, uriToSave); //bulk

            }

            if(i===$(".contentFormEntry").length-1){
                notes(canvasURI, flag, canvas); //bulk
            }
        }
    }
        //Go through each content piece, grab its value and if applicable make it an annotation or a range.
        
        function context(canvasURI, flag, canvas){
            //console.log("context");
            var uriToSave = canvasURI;
            for(var j = 0; j<$(".contextFormEntry").length; j++){
                var _this = $(".contextFormEntry")[j];
                var entryValue = $(_this).find(".content").val();
                var special = $(_this).attr("special");
                var addedInfoList2 = {};
            //console.log(alpha, beta, zeta);
                if(zeta){ addedInfoList2 = $("#zetaInformation").find(".contextList"); }
                else if(alpha){ addedInfoList2 = $("#alphaInformation").find(".contextList"); }
                else if(beta){ addedInfoList2 = $("#betaInformation").find(".contextList"); }
                //console.log(addedInfoList2);
                var entryID = $(_this).find(".content").attr("id");
                var range = $(_this).find(".content").attr("range");
                range = (range !== undefined && range !== "");
                var addedInfoLabel = $(_this).find(".formLabel").html();
                addedInfoLabel = addedInfoLabel.replace(":", "");
                addedInfoLabel = addedInfoLabel.replace(/ *\([^)]*\) */g, "");
                var forProject = detectWho();
                //console.log(entryID, entryValue, range, addedInfoLabel);
                var annotationObject = {
                    "@id" : "",
                    "@type" : "oa:Annotation",
                    "motivation" : "oa:describing",
                    "forProject" : forProject,
                    "label" : "",
                    "resource" : {
                      "@type" : "cnt:ContentAsText",
                      "cnt:chars" :""
                },
                "on" : canvasURI //this will be a rangeURI if uriToSave is set to the leaf uri instead of a canvasURI, which is what we want.  annotations can be saved to ranges. 
                };

                if((entryValue !== undefined && entryValue !== "") || $(_this).attr("set") === "set"){
                    //console.log('HELLO')
                    var newAnnoURI = "http://www.example.org/iiif/LlangBrev/annos/" +annoID; 
                    //console.log("Anno Object @ID is being set to :" + newAnnoURI)
                    annotationObject["@id"] = newAnnoURI;
                    annotationObject.resource["cnt:chars"] = entryValue;
                        annotationObject["@id"] = "http://www.example.org/iiif/LlangBrev/annos/" +(annoID);
                        annotationObject.label = addedInfoLabel;
                        annotationObject.resource["cnt:chars"] = entryValue;
                        $(_this).attr("set", "set");
                        createNewAnno(annotationObject, addedInfoLabel, entryValue, addedInfoList2, uriToSave);//bulk
                }       
                
                if(j===$(".contextFormEntry").length-1){
                    carrier(canvasURI, flag, canvas);
                }
            }
        }
        
        function carrier(canvasURI, flag, canvas){
            //console.log("carrier");
            var uriToSave = canvasURI;
            for(var k = 0; k<$(".carrierFormEntry").length; k++){
                var _this = $(".carrierFormEntry")[k];
                var entryValue = $(_this).find(".content").val();
                var special = $(_this).attr("special");
                var addedInfoList3 = {};
                if(zeta){ addedInfoList3 = $("#zetaInformation").find(".carrierList"); }
                else if(alpha){ addedInfoList3 = $("#alphaInformation").find(".carrierList"); }
                else if(beta){ addedInfoList3 = $("#betaInformation").find(".carrierList"); }
                var entryID = $(_this).find(".content").attr("id");
                var range = $(_this).find(".content").attr("range");
                range = (range !== undefined && range !== "");
                var addedInfoLabel = $(_this).find(".formLabel").html();
                addedInfoLabel = addedInfoLabel.replace(":", "");
                addedInfoLabel = addedInfoLabel.replace(/ *\([^)]*\) */g, "");
                var forProject = detectWho();
                var annotationObject = {
                    "@id" : "",
                    "@type" : "oa:Annotation",
                    "motivation" : "oa:describing",
                    "forProject" : forProject,
                    "label" : "",
                    "resource" : {
                      "@type" : "cnt:ContentAsText",
                      "cnt:chars" :""
                    },
                    "on" : canvasURI //this will be a rangeURI if uriToSave is set to the leaf uri instead of a canvasURI, which is what we want.  annotations can be saved to ranges. 
                };

                if(special !== undefined && special !== ""){
                    //console.log(special);
                    if(special === "dimensions"){
                        //console.log("DIMENSIONS")
                        var leafHeight = $("#leafHeight").val();
                        var leafWidth = $("#leafWidth").val();
                        var leafHeightSet = $("#leafHeight").attr("set");
                        var leafWidthSet = $("#leafWidth").attr("set");

                        var textHeight = $("#tbHeight").val();
                        var textWidth = $("#tbWidth").val();
                        var tbHeightSet = $("#tbHeight").attr("set");
                        var tbWidthSet = $("#tbWidth").attr("set");

                        var lineHeight = $("#lHeight").val();
                        var lineWidth = $("#lWidth").val();
                        var lineHeightSet = $("#lHeight").attr("set");
                        var lineWidthSet = $("#lWidth").attr("set");

                        if(leafHeight!== "" || leafWidth!=="" || leafHeightSet === "set" || leafWidthSet === "set"){
                           // setTimeout(function(){
                                var annotationObject1 = {
                                    "@id" : "",
                                    "@type" : "oa:Annotation",
                                    "motivation" : "oa:describing",
                                    "forProject" : forProject,
                                    "label" : "Leaf Height",
                                    "resource" : {
                                      "@type" : "cnt:ContentAsText",
                                      "cnt:chars" :leafHeight
                                    },
                                    "on" : canvasURI //this will be a rangeURI if uriToSave is set to the leaf uri instead of a canvasURI, which is what we want.  annotations can be saved to ranges. 
                                };
                                $("#leafHeight").attr("set", "set");

                                createNewAnno(annotationObject1, "Leaf Height", leafHeight, addedInfoList3, uriToSave);//bulk
                            //}, 400);

                            //setTimeout(function(){
                                var annotationObject2 = {
                                    "@id" : "",
                                    "@type" : "oa:Annotation",
                                    "motivation" : "oa:describing",
                                    "forProject" : forProject,
                                    "label" : "Leaf Width",
                                    "resource" : {
                                      "@type" : "cnt:ContentAsText",
                                      "cnt:chars" :leafWidth
                                    },
                                    "on" : canvasURI //this will be a rangeURI if uriToSave is set to the leaf uri instead of a canvasURI, which is what we want.  annotations can be saved to ranges. 
                                };
                                $("#leafWidth").attr("set", "set");
                                createNewAnno(annotationObject2, "Leaf Width", leafWidth, addedInfoList3, uriToSave); //bulk
                            //}
                            //,400);
                        }
                        if(textHeight !== "" || textWidth !=="" || tbHeightSet === "set" || tbWidthSet === "set"){
                            //console.log("TEXT IT "+textHeight+", "+textWidth);
                             //setTimeout(function(){
                                var annotationObject3 = {
                                    "@id" : "",
                                    "@type" : "oa:Annotation",
                                    "motivation" : "oa:describing",
                                    "forProject" : forProject,
                                    "label" : "Text Height",
                                    "resource" : {
                                      "@type" : "cnt:ContentAsText",
                                      "cnt:chars" :textHeight
                                    },
                                    "on" : canvasURI //this will be a rangeURI if uriToSave is set to the leaf uri instead of a canvasURI, which is what we want.  annotations can be saved to ranges. 
                                };
                                $("#tbHeight").attr("set", "set");
                                 createNewAnno(annotationObject3, "Text Height", textHeight, addedInfoList3, uriToSave);//bulk
                             //}
                            //,400);

                            //setTimeout(function(){
                                var annotationObject4 = {
                                    "@id" : "",
                                    "@type" : "oa:Annotation",
                                    "motivation" : "oa:describing",
                                    "forProject" : forProject,
                                    "label" : "Text Width",
                                    "resource" : {
                                      "@type" : "cnt:ContentAsText",
                                      "cnt:chars" :textWidth
                                    },
                                    "on" : canvasURI //this will be a rangeURI if uriToSave is set to the leaf uri instead of a canvasURI, which is what we want.  annotations can be saved to ranges. 
                                };
                            //this will increment annoID by 1
                            $("#tbWidth").attr("set", "set");
                            createNewAnno(annotationObject4, "Text Width", textWidth, addedInfoList3, uriToSave);//bulk
                            //}
                            //,400);

                        }
                        if(lineHeight !== "" || lineWidth !== "" || lineHeightSet === "set" || lineWidthSet === "set"){
                            //console.log("LINE IT "+lineHeight+", "+lineWidth);
                            //setTimeout(function(){
                                var annotationObject5 = {
                                    "@id" : "",
                                    "@type" : "oa:Annotation",
                                    "motivation" : "oa:describing",
                                    "forProject" : forProject,
                                    "label" : "Line Height",
                                    "resource" : {
                                      "@type" : "cnt:ContentAsText",
                                      "cnt:chars" :lineHeight
                                    },
                                    "on" : canvasURI //this will be a rangeURI if uriToSave is set to the leaf uri instead of a canvasURI, which is what we want.  annotations can be saved to ranges. 
                                };
                                $("#lHeight").attr("set", "set");
                                 createNewAnno(annotationObject5, "Line Height", lineHeight, addedInfoList3, uriToSave);//bulk
                                //}
                                //,400);

                            //setTimeout(function(){
                                var annotationObject6 = {
                                    "@id" : "",
                                    "@type" : "oa:Annotation",
                                    "motivation" : "oa:describing",
                                    "forProject" : forProject,
                                    "label" : "Line Width",
                                    "resource" : {
                                      "@type" : "cnt:ContentAsText",
                                      "cnt:chars" :lineWidth
                                    },
                                    "on" : canvasURI //this will be a rangeURI if uriToSave is set to the leaf uri instead of a canvasURI, which is what we want.  annotations can be saved to ranges. 
                                };
                            //this will increment annoID by 1
                            $("#lWidth").attr("set", "set");
                            createNewAnno(annotationObject6, "Line Width", lineWidth, addedInfoList3, uriToSave);//bulk
                            //}
                            //,400);
                        }
                    }
                }
                else if((entryValue !== undefined && entryValue !== "") || $(_this).attr("set") === "set"){
                    annotationObject.resource["cnt:chars"] = entryValue;
                    annotationObject.label = addedInfoLabel;
                    annotationObject.resource["cnt:chars"] = entryValue;
                    $(_this).attr("set", "set");
                    createNewAnno(annotationObject, addedInfoLabel, entryValue, addedInfoList3, uriToSave);//bulk
                }   
              
              if(k===$(".carrierFormEntry").length-1){
                  content(canvasURI, flag, canvas);
              }
          }  
    }
    
    function notes(canvasURI, flag, canvas){
        //console.log("notes");
        var uriToSave = canvasURI;
        var canvasNotes = $("#notes").val();
        var forProject = detectWho();
        if(canvasNotes !== "" || $("#notes").attr("set") === "set"){
            var newAnnoURI = "http://www.example.org/iiif/LlangBrev/annos/" +annoID;             
            var annoObject = {
                //"@id" : newAnnoURI,
                "@type" : "oa:Annotation",
                "motivation" : "oa:describing",
                "forProject" : forProject,
                "label" : "General Metadata",
                "resource" : {
                  "@type" : "cnt:ContentAsText",
                  "cnt:chars" : canvasNotes
                },
                "on" : canvasURI
            };
            $("#notes").attr("set", "set");
            createNewAnno(annoObject, "General Metadata", canvasNotes, $("#notes"), uriToSave);//bulk
            // otherInfoList.append("<li><span class='formLabel'>General Notes: </span> "+canvasNotes+" <span annoServerID='"+annoServerID+"' class='removeInfo'> X </span></li>");
        }
        updateLabels(flag, canvasURI, canvas);
    }
    
    function updateLabels(flag, uri, canvas){
      //console.log("Updating labels. ");
      var windowURL = document.location.href;
        var canvas1 = $("#folioSide1").attr("canvas");
        var canvas2 = $("#folioSide2").attr("canvas");
        var leaf = currentLeafServerID;
        var label1 = $("#folio1Label").val();
        var label2 = $("#folio2Label").val();
        var leafLabel = $("#oneAndtwoLabel").val();
        
        var updateCanvasURL = "http://localhost:8080/brokenBooks/updateCanvas";
        var updateRangeURL = "http://localhost:8080/brokenBooks/updateRange";
        
        if(label1 !== undefined && windowURL.indexOf("demo=1")===-1){
            if(label1 === ""){
                label1 = "Side A";
            }
            var paramObj1 = {"@id": canvas1, "label":label1};
            var params1 = {"content":JSON.stringify(paramObj1)};
            if(windowURL.indexOf("demo=1") > -1){
                
            }
            else{
                //updateInManifest("sequences",paramObj1);
                $.post(updateCanvasURL, params1, function(data1){
                    
                });
            }
            
        }
        if(label2 !== undefined&& windowURL.indexOf("demo=1")===-1){
            if(label2 === ""){
                label2 = "Side B";
            }
            var paramObj2 = {"@id": canvas2, "label":label2};
            var params2 = {"content":JSON.stringify(paramObj2)};
                //updateInManifest("sequences",paramObj2);
                $.post(updateCanvasURL, params2, function(data2){

                });
        }
        if(leafLabel !== undefined){
            if(leafLabel === ""){
                leafLabel = "Manifest Page";
            }
            var paramObj3 = {"@id": leaf, "label":leafLabel};
            var params3 = {"content":JSON.stringify(paramObj3)};
            if(windowURL.indexOf("demo=1")>-1){
                    $(".arrangeSection[rangeID='"+leaf+"']").children("span:first").html(leafLabel);
                    $("#leafLabel").val(leafLabel);
            }
            else{
            //updateInManifest("structures",paramObj3);
              $.post(updateRangeURL, params3, function(data3){
                    //must paginate because these are in the leaf popover and admin interface.
                    //console.log("update arrange section " + leaf +" with label "+leafLabel);
                    //console.log($(".arrangeSection[rangeID='"+leaf+"']"));console.log
                    //console.log($(".arrangeSection[rangeID='"+leaf+"']").children("span:first"));
                    $(".arrangeSection[rangeID='"+leaf+"']").children("span:first").html(leafLabel);
                    $("#leafLabel").val(leafLabel);
                });  
            }
                
        }
        setTimeout(function(){updateList(flag, uri, canvas);}, 2400); //DO THE BULK.  
     // This timeout lets the UI do all the madness.  It could be less, we may not need it, but its safe and a good length here.
    }
    
    function updateList(flag, uri, canvas){  
        //console.log("made it to update list with");
        //console.log(flag, uri, canvas);
        var windowURL = document.location.href;
        var objectID = uri;
        var forProject = detectWho();
        if(windowURL.indexOf("demo=1")>-1){
                if(flag){
                    $(".content").val(""); //A save happened when switching between sides.  Annos were not populated, need to do it now.
                    var canvasID = "";
                    if(canvas == 'recto'){
                        canvasID = $("#folioSide1").attr("canvas");
                        $("#catalogueInfoFor").val(canvasID); //alpha
                        alpha = true;
                        beta= false;
                        zeta = false;
                    }
                    else if (canvas == 'verso'){
                        canvasID = $("#folioSide2").attr(canvas);
                        $("#catalogueInfoFor").val(canvasID); //beta
                        beta = true;
                        alpha = false;
                        zeta = false;
                    }
                    else{                                 
                        $("#catalogueInfoFor").val(currentLeafServerID); //zeta
                        alpha = beta = zeta = true;
                    }
                    var previewImgSrc = $("."+canvas+"Img").attr("src");
                    $(".imgPreview").attr("src",previewImgSrc);
                    $("tr[set='set']").attr("set", "");
                    $("#notes").attr("set", "");
                    //console.log("we are populate anno forms");
                    populateAnnoForms();
                    $("#saveCover").hide();
                }
        }
            $.each(annoListCollection, function(){
                //console.log("Does "+this.on+" === "+objectID);
                if(this.on === objectID){ //this is our annotation list to add the annotation to 
                    var updateAnnoListURL = "http://localhost:8080/brokenBooks/updateRange";
                    var bulkUpdateAnnosURL =  "http://localhost:8080/brokenBooks/bulkSubmitMetadata";
                    var updateID = this["@id"];
                    var params2 = {"content":JSON.stringify(this.resources)};
                    if(windowURL.indexOf("demo=1")>-1){
                        if(!flag){
                            closeLeafPopover();
                        }
                    }
                    else{
                       $.post(bulkUpdateAnnosURL, params2, function(updatedAnnos){
                           console.log("Bulked the annos!");
                           updatedAnnos = JSON.parse(updatedAnnos);
                           console.log(updatedAnnos.reviewed_resources);
                           if(alpha){
                               console.log("Set cached annos a");
                               annoListCollection[0].resources = updatedAnnos.reviewed_resources;
                           }
                           else if(beta){
                               console.log("Set cached annos b");
                               annoListCollection[1].resources = updatedAnnos.reviewed_resources;
                           }
                           else if(zeta){
                               console.log("Set cached annos z");
                               annoListCollection[2].resources = updatedAnnos.reviewed_resources;
                           }
                           var paramsObj = {"@id": updateID, "resources":updatedAnnos.reviewed_resources};
                           var params = {"content":JSON.stringify(paramsObj)};
                           $.post(updateAnnoListURL, params, function(data){
                            console.log("updated the list!");
                             if(zeta){
                                 $.each(rangeCollection, function(){
                                     if (this["@id"] === objectID){ 
                                         var otherContent1 = {"@id":annoListCollection[2]["@id"], "@type":"sc:AnnotationList", "context" : "http://www.shared-canvas.org/ns/context.json", "forProject": forProject};
                                         var listIncluded = false;
                                         $.each(this.otherContent,function(){
                                                 if(this["@id"] === annoListCollection[2]["@id"]){
                                                         listIncluded = true;
                                                         return false;
                                                 }
                                         });
                                         if(!listIncluded)this.otherContent.push(otherContent1); //If the annotation list is not already included in the otherContent field, add it. 
                                     }
                                 });//local. adds the annotation list uri to the other content field.  
                             }
                             else{
                                var annoListID2 = -1;
                                $.each(manifestCanvases, function(){
                                    if (this["@id"] === objectID){ //this is our canvas object
                                        if(alpha){
                                            annoListID2 = annoListCollection[0]["@id"];
                                        }
                                        else{
                                            annoListID2 = annoListCollection[1]["@id"];
                                        }
                                        var otherContent2 = {"@id":annoListID2, "@type":"sc:AnnotationList", "context" : "http://www.shared-canvas.org/ns/context.json", "forProject": forProject};
                                        var listIncluded = false;
                                        $.each(this.otherContent,function(){
                                            if(this["@id"] === annoListID2){
                                                    listIncluded = true;
                                                    return false;
                                            }
                                        });
                                        if(!listIncluded)this.otherContent.push(otherContent2); //If the annotation list is not already included in the otherContent field, add it. 
                                    }
                                });
                             }//local
                             $("#saveCover").hide();
                             //console.log("Flag must be true to populate anno forms: "+flag);
                             if(flag){
                                 $(".content").val(""); //A save happened when switching between sides.  Annos were not populated, need to do it now.
                                 var canvasID = "";
                                 if(canvas == 'recto'){
                                     canvasID = $("#folioSide1").attr("canvas");
                                     $("#catalogueInfoFor").val(canvasID); //alpha
                                     alpha = true;
                                     beta= false;
                                     zeta = false;
                                 }
                                 else if (canvas == 'verso'){
                                     canvasID = $("#folioSide2").attr(canvas);
                                     $("#catalogueInfoFor").val(canvasID); //beta
                                     beta = true;
                                     alpha = false;
                                     zeta = false;
                                 }
                                 else{                                 
                                     $("#catalogueInfoFor").val(currentLeafServerID); //zeta
                                     alpha = beta = zeta = true;
                                 }
                                 var previewImgSrc = $("."+canvas+"Img").attr("src");
                                 $(".imgPreview").attr("src",previewImgSrc);
                                 $("tr[set='set']").attr("set", "");
                                 $("#notes").attr("set", "");
                                 //console.log("we are populate anno forms");
                                 populateAnnoForms();
                             }
                         });
                       });
                    }
                    return false;
                }
        });
    }

    function savePlacement(){
        var section = "";
        var windowURL = document.location.href;
        var sectionObj = $(".selectedSection:last");
        if($(".selectedSection:last").attr('relation') === 'bucket'){
          section = "root";
        }
        else{
          section = $(".selectedSection:last").attr("rangeID");
        }
        if(section !== "bucket"){
          updateRange(section, currentLeafServerID, 'arrange', []);
          
          if(windowURL.indexOf("demo=1") === -1){
            var updateURL = "http://localhost:8080/brokenBooks/updateRange";
            var paramObj = {"@id":currentLeafServerID, "within":section};
            var params = {"content":JSON.stringify(paramObj)};
            //updateInManifest("structures",paramObj);
            $.post(updateURL, params, function(){
                dropFlash(sectionObj);
            });
          }
          else{
              dropFlash(sectionObj);
          }
        }
    }

    function resetPlacement(){
      $(".selectedSection").removeClass("selectedSection");
      if($(".parentSection").length > 0){
        $.each($(".parentSection"), function(){
          var rangeID2 = $(this).attr("rangeID");
          $(".arrangeSection[rangeID='"+rangeID2+"']").addClass("selectedSection");
        });
      }
      else{
        $('.rangeArrangementArea:first').find('.unassigned').addClass("selectedSection");
      }
      $.each($(".rangeArrangementArea"),function(){
        if($(this).find(".selectedSection").length == 0){
          $(this).remove();
        }
      });
    }
    
	function showFullImage(imgContainer){
            var imgToShow = $("#"+imgContainer).find('img').attr("src");
            $("#fullImgContainer").find('img').attr('src', imgToShow);
            $("#fullImgContainer").show();
            //$("#fullImageShade").show();
	}
	function hideFullImage(){
            $("#fullImgContainer").hide();
            $("#fullImageShade").hide()
	}
	function addImage(anno, canvasURI){
              var updateCanvasURL = "http://localhost:8080/brokenBooks/updateCanvas";
              var paramObj = {"@id": canvasURI, "images":[anno]};
              var params = {"content":JSON.stringify(paramObj)};
              //updateInManifest("sequences",paramObj);
              $.post(updateCanvasURL, params, function(data){
                  $.each(manifestCanvases, function(){
			if(this["@id"] === canvasURI){
                            this.images.push(anno);
                            return false;
			}
		});
              });
	}

	/*
		Check if this particular annotation already exists.  If it does, we want to update the annotation.  Otherwise, we want to save a new one.
		@see createNewAnno()
	*/
	function annoExists(annoObject){
            var labelToCheckFor = annoObject.label;
            var tmpAnnos = [];
            var theReturn = false;
            var theURI = "";
            if(zeta){
                tmpAnnos = annoListCollection[2];
            }
            else if(alpha){
                tmpAnnos = annoListCollection[0];
            }
            else{
                tmpAnnos = annoListCollection[1];
            }
            var annoResources = [];
            if(!tmpAnnos.resources instanceof Array){
                annoResources = JSON.parse(tmpAnnos.resources);
            }
            else{
                annoResources = tmpAnnos.resources;
            }
            for(var i=0; i<annoResources.length; i++){
                if(annoResources[i].label === labelToCheckFor){
                    theReturn = true;
                    return true;
                }
            }
            return theReturn;
	}

	function updateAnnotation(annoURI, annoObj){
                //This action will happen outside the post because its timing effects saveFolio() and updateList()
                if(zeta){
                    $.each(annoListCollection[2].resources, function(){
                        if(this["@id"] == annoURI){
                            this.resource = annoObj.resource;
                            console.log("Update value to "+annoObj.resource["cnt:chars"] + " because matched id "+this["@id"]);
                            //actually update the annoList since we put the whole resource there and not just he URI.
                        }
                    });
                }
                else if (alpha){
                    $.each(annoListCollection[0].resources, function(){
                        if(this["@id"] == annoURI){
                            this.resource = annoObj.resource;
                            console.log("Update value to "+annoObj.resource["cnt:chars"] + " because matched id "+this["@id"]);
                            //actually update the annoList since we put the whole resource there and not just he URI.
                        }
                    });
                }
                else{
                    $.each(annoListCollection[1].resources, function(){
                        if(this["@id"] == annoURI){
                            this.resource = annoObj.resource;
                            console.log("Update value to "+annoObj.resource["cnt:chars"] + " because matched id "+this["@id"]);
                            //actually update the annoList since we put the whole resource there and not just he URI.
                        }
                    });
                }
	}

	/*
		This function takes the annotation object and saves it in the manifest object in the appropriate location.  it makes the decision whether the annotation is being saved to a canvas or a range. 
	*/
	function createNewAnno(annoObject, newLabel, value, list, uri){
            //TODO FIX: Does not allow annotations to be saved in order
		// A.K.A update annotationList
                console.log("create new anno time...");
                console.log("It has label: "+newLabel+" and value: "+value+".  Does that match "+annoObject.resource["cnt:chars"]);
		annoID ++;
		var objectID = uri; //which object are we saving to
		//var annoServerID = -1;
		annoObject.on = objectID; //set the on property to be what object we are saving to 
                annoObject.label = newLabel;
                annoObject.resource["cnt:chars"] = value;
		//var newAnnoUrl = "http://localhost:8080/brokenBooks/saveNewRange";
		//var params = {'content':JSON.stringify(annoObject)};
		var labelToCheckFor = annoObject.label;
                //var windowURL = document.location.href;
		var tmpAnnos = [];
		//var theReturn = undefined;
		//var theURI = "";

		/* See if the annotation exists and if so, update its resource. Otherwise, push it to the array. */
		if(zeta){
                    tmpAnnos = annoListCollection[2];
		}
		else if (alpha){
                    tmpAnnos = annoListCollection[0];
		}
		else{
                    tmpAnnos = annoListCollection[1];
		}
                var annoResources = [];
                if(!tmpAnnos.resources instanceof Array){
                    annoResources = JSON.parse(tmpAnnos.resources);
                }
                else{
                    annoResources = tmpAnnos.resources;
                }
                if(annoResources.length > 0){
                    for(var i=0; i<annoResources.length; i++){
                        var labelForCheck = annoResources[i].label;   
                        //console.log("Does "+i+" == "+ (annoResources.length - 1) +" or 0?");
                        if(labelForCheck === labelToCheckFor){
                            // this annotation exists.  Update annotation and list.
                            console.log("This anno already exists...");
                            updateAnnotation(annoResources[i]["@id"], annoObject);
                            break;
                        }
                        else if(i === annoResources.length - 1){ //we did not find this anno or the list was empty, save it as a new one in the list. 
                            console.log("This is a new anno, push it to anno list collection...");
                            console.log("Its value is "+annoObject.resource["cnt:chars"]);
                            if(zeta){
                                if(annoListCollection[2].resources === "[]"){
                                    annoListCollection[2].resources = [];
                                }
                                annoListCollection[2].resources.push(annoObject); 
                            }
                            else if(alpha){
                                if(annoListCollection[0].resources === "[]"){
                                    annoListCollection[0].resources = [];
                                }
                                annoListCollection[0].resources.push(annoObject); 
                            }
                            else{
                                if(annoListCollection[1].resources === "[]"){
                                    annoListCollection[1].resources = [];
                                }
                                annoListCollection[1].resources.push(annoObject); 
                            }
                            break;
                    }

                }
                
            }
            else{
                console.log("This is a new anno to an empty list");
                console.log("Its value is "+annoObject.resource["cnt:chars"]);
                if(zeta){
                    if(annoListCollection[2].resources === "[]"){
                        annoListCollection[2].resources = [];
                    }
                    annoListCollection[2].resources.push(annoObject); 
                }
                else if(alpha){
                    if(annoListCollection[0].resources === "[]"){
                        annoListCollection[0].resources = [];
                    }
                    annoListCollection[0].resources.push(annoObject); 
                }
                else{
                    if(annoListCollection[1].resources === "[]"){
                        annoListCollection[1].resources = [];
                    }
                    annoListCollection[1].resources.push(annoObject); 
                }
            }

	}
        
        /* 
         * The range that acts as the root range object needs to contain this newly added range in its list or it wont appear in order
         * in the structures.
         * 
         * This newly created range also needs to be added to manifest.structures.
         * */
        function updateRootRanges(who, newRangeID, removeFlag, index){
            console.log("update root ranges");
            var getURL = "http://localhost:8080/brokenBooks/getAnnotationByPropertiesServlet";
            var paramObj1 = {"parent" : who};
            var params1 = {"content" : JSON.stringify(paramObj1)};
            $.post(getURL, params1, function(rootRangeList){
                rootRangeList=JSON.parse(rootRangeList);
                var rootRange = rootRangeList[0];
                var rangesToUpdate = rootRange.ranges;
                if(removeFlag){
                    rangesToUpdate.splice(index,1);
                }
                else{
                    rangesToUpdate.push(newRangeID);
                }
                var updateURL ="http://localhost:8080/brokenBooks/updateRange";
                var paramObj2 = {"@id" : rootRange["@id"], "ranges" : rangesToUpdate};
                var params = {"content":JSON.stringify(paramObj2)};
                updateManifestStructures();
                $.post(updateURL, params);
            });
        }
               
        /* An object has been updated.  Its representation in the manifest must also be updated.  where tells me either structures or sequence, the params are in order of
         * @id followed by some fields to update.  I then call to the server to update the sequences or structures field of the manifest object. 
         * 
         * This can be used to update the manifest in real time.  We are doing it on a publish request, so this is
         * no longer used.
         *  
         *  */
        function updateInManifest(where, params){
            console.log("need to update in the manifest...");
            var idToFind = params["@id"];
            delete params["@id"];
            if(where === "structures"){
                for(var i=0; i< rangeCollection.length; i++){
                    if(rangeCollection[i]["@id"] === idToFind){
                        $.each(params, function(paramKey, paramVal){
                           rangeCollection[i][paramKey] = paramVal;
                        });
                        //updateManifestStructures();
                        break;
                    }
                }
            }
            else if(where === "sequences"){
                for(var i=0; i< manifestCanvases.length; i++){
                    if(manifestCanvases[i]["@id"] === idToFind){
                        $.each(params, function(paramKey, paramVal){
                            manifestCanvases[i][paramKey] = paramVal;
                        });
                        //updateManifestSequence();    
                        break;
                    }
                }
            }
        }
        
        function updateManifestStructures(){
            console.log("updating manifest structures...");
            var postURL = "http://localhost:8080/brokenBooks/updateRange";
            var paramObj1 = {"@id" : manifestID, "structures":rangeCollection};
            var params1 = {"content" : JSON.stringify(paramObj1)};
            $.post(postURL, params1, function(rootRangeList){
                manifest.structures = rangeCollection;
                console.log("done updating manifest structures");
            });
        }
        
        function updateManifestSequence(){
            console.log("updating manifest sequence...");
            var postURL = "http://localhost:8080/brokenBooks/updateRange";
            var sequenceObj = {
                "@id" : "http://localhost:8080/brokenBooks/sequence/normal",
                "@type": "sc:Sequence",
                "label" : "Manifest Sequence",
                "canvases" : manifestCanvases
            };
            var paramObj1 = {"@id" : manifestID, "sequences":[sequenceObj]};
            var params1 = {"content" : JSON.stringify(paramObj1)};
            $.post(postURL, params1, function(data){
                manifest.sequences[0].canvases = manifestCanvases;
                console.log("done updating manifest sequence");
            });
        }

	/*
		Add the range object to the structures array in the manifest object. 
	*/
	function createNewRange(newRangeObject, current, newLabel, value, list){
            console.log("create new range");
		rangeID ++;
                var who = "";
		var newAnnoUrl = "http://localhost:8080/brokenBooks/saveNewRange";
		var windowURL = document.location.href;
                var updateCanvasURL = "http://localhost:8080/brokenBooks/updateCanvas";
                if(windowURL.indexOf("demo=1") > -1){
                    rangeCollection.push(newRangeObject); 
                    if(current === 'currentLeaf'){
                        currentLeafServerID = newRangeObject["@id"];
                        currentLeaf = currentLeafServerID;
                        $("#oneAndtwo").attr("onclick", "enterCatalogueInfo('leaf')");
                    }
                    else{
                            //list.append("<li><span class='formLabel'>"+newLabel+" </span> "+value+"<span annoServerID='"+data["@id"]+"' class='removeInfo'> X </span></li>");
                    }
                    var forProject = detectWho();
                    who = forProject.replace("broken_books_", "paggr_");
//                    if(forProject === "broken_books_ray"){
//                        who = "paggr_ray";
//                    }
//                    else if (forProject === "broken_books_lisa"){
//                        who="paggr_lisa";
//                    }
//                    else{
//                        who = "paggr_debra";
//                    }
                    annoListID = parseInt(annoListID) + 1;
                    var newRangeAnnoList = {
                        "@id":"http://www.example.org/iiif/LlangBrev/annoList/"+annoListID, 
                        "@type":"sc:AnnotationList",
                        "resources" : [],
                        "on" :newRangeObject["@id"],
                        "forProject": forProject
                    };
                    var newLeafList = {
                        "@id":newRangeAnnoList["@id"],
                        "@type":"sc:AnnotationList",
                        "resources" : [],
                        "on" :newRangeObject["@id"],
                        "forProject": forProject
                    };

                    if(current === "currentLeaf"){
                        annoListCollection[2] = newLeafList;
                    }
    
                }
                else{
                    $.post(newAnnoUrl, {'content': JSON.stringify(newRangeObject)}, function(data){
                        data=JSON.parse(data);
                        newRangeObject["@id"] = data["@id"]; //live
                        if(current === 'currentLeaf'){
                            //console.log("set current leaf server id");
                            currentLeafServerID = data["@id"];
                            currentLeaf = currentLeafServerID;
                            $("#oneAndtwo").attr("onclick", "enterCatalogueInfo('leaf')");
                        }
                        else{
                                //list.append("<li><span class='formLabel'>"+newLabel+" </span> "+value+"<span annoServerID='"+data["@id"]+"' class='removeInfo'> X </span></li>");
                        }
                    var forProject = detectWho();
                    who = forProject.replace("broken_books_", "paggr_");
//                    if(forProject === "broken_books_ray"){
//                        who = "paggr_ray";
//                    }
//                    else if(forProject === "broken_books_lisa"){
//                        who="paggr_lisa";
//                    }
//                    else{
//                        who="paggr_debra";
//                    }
                    var newRangeAnnoList = {
                        "@id":"http://www.example.org/iiif/LlangBrev/annoList/"+annoListID, 
                        "@type":"sc:AnnotationList",
                        "resources" : [],
                        "on" :newRangeObject["@id"],
                        "forProject": forProject
                    };
                    var listURL = "http://localhost:8080/brokenBooks/saveNewRange";
                    var listParams = {"content" : JSON.stringify(newRangeAnnoList)};
                    $.post(listURL, listParams, function(data2){
                        data2 = JSON.parse(data2);
                        var newLeafList = {
                            "@id":data2["@id"],
                            "@type":"sc:AnnotationList",
                            "resources" : [],
                            "on" :newRangeObject["@id"],
                            "forProject": forProject
                        };

                        if(current === "currentLeaf"){
                            annoListCollection[2] = newLeafList;
                        }

                        var paramObj = {"@id":currentLeafServerID, "otherContent":[{"@id":newLeafList["@id"], "@type":"sc:AnnotationList"}]};
                        var params = {"content":JSON.stringify(paramObj)};
                        //updateInManifest("sequences",paramObj);
                        newRangeObject.otherContent = [{"@id":newLeafList["@id"], "@type":"sc:AnnotationList"}];
                        rangeCollection.push(newRangeObject);
                        //this will be updated in updateRootRanges
                        updateRootRanges(who, newRangeObject["@id"]);
                        $.post(updateCanvasURL, params, function(data){

                        });
                    });
                    
                });
                }
	}

  function askForNewTitle(inThisArea){
//    $.each(inThisArea.find("input:checked"), function(){
//      if($(this).parent().attr("class").indexOf("selectedSection")){
//          alert("cannot merge an opened section");
//      }
//    });
    var newTitleRequest = 
    $("<div style='display:block;' id='newGroupTitleArea' class='helPop'><div style='left: 32px;' class='popHdr'>Merge Checked Selection</div>\n\
    <div style='height:100%;' class='helperContent demoContent demoHdrTxt'>\n\
        <span class='newgroupLabel'>New Group Title</span><input id='newGroupTitle' type='text'/><div class='noTitleWarning'>You must supply a title to make a group.</div>\n\
    </div>\n\
        <input style='position: absolute; right:87px;' onclick=\"makeAgroup($('#newGroupTitle').val());\" type='button' value='Submit'/>\n\
        <input style='position: absolute; right:33px;' onclick=\"$('#newGroupTitleArea').remove();  $('.mainBlockCover').hide();\" type='button' value='Cancel'/>\n\
    </div>");
    $('.adminTrail').append(newTitleRequest);
    $(".mainBlockCover").show();
    theArea = inThisArea;
  }

  function makeAgroup(title){
      title = $("#newGroupTitle").val();
      var windowurl = document.location.href;
      var closeLastSection = false;
       var leafCount = 0;
       var children = [];
        if(title===""){
          $(".noTitleWarning").show();
          setTimeout($('.noTitleWarning').fadeOut(1000), 2000);
        }
        else{
          var childrenForGroup = [];
          var addLeaves = 0;
          $.each(theArea.find("input:checked"), function(){
              childrenForGroup.push($(this).parent());
              children.push($(this).parent().attr("rangeID"));
              if($(this).parent().attr("class").indexOf("selectedSection") > -1){
                  closeLastSection = true;
              }
              if($(this).parent().attr("leaf") === "true"){
                  addLeaves = 1;
              }
              else{
                  addLeaves = parseInt($(this).parent().find(".folioCount").find(".countInt").html());
              }
              leafCount += addLeaves;
          });
          
          var uniqueID = ($(".arrangeSection").length * 10) + 1;
          var depthToCheck = parseInt(theArea.attr("depth")) - 1;
          var areaForNewGroup = "";
          if($(".adminTrail").find("div[depth='"+depthToCheck+"']").children(".unassigned").hasClass("selectedSection")){
              areaForNewGroup = $(".adminTrail").find("div[depth='"+depthToCheck+"']");
          }
          else{
                areaForNewGroup = theArea;
          }
            rangeID = parseInt(rangeID) + 1;
            var mockID = "http://www.example.org/iiif/LlangBrev/range/"+rangeID;
            var dragAttribute = "id='drag_"+uniqueID+"' draggable='true' ondragstart='dragHelp(event);' ondragend='dragEnd(event);'";
            var dropAttribute = " ondragover='dragOverHelp(event);' ondrop='dropHelp(event);'";
            var rightClick = "oncontextmenu='breakUpConfirm(event); return false;'";
            var newGroup = $("<div rangeID='"+mockID+"' class='arrangeSection child sortOrder' "+dragAttribute+" "+dropAttribute+" "+rightClick+" leaf='false' onclick=\"toggleChildren($(this),'admin',event);\"><span>"+title+"</span><input class='putInGroup' type='checkbox' /></div>");
             $.each(childrenForGroup, function(){
              var newChild = $(this);
              if(newChild.hasClass("parent")){
                newChild.removeClass("parent").addClass("child");
                newGroup.removeClass("child").addClass("parent");
              }
              newGroup.append(newChild);
            });
            var leafCountHTML = $("<span class='folioCount'><span class='countInt'>"+leafCount+"</span><img class='pageIcon' src='http://localhost:8080/brokenBooks/images/b_page.png'/></span>");
            newGroup.append(leafCountHTML);
            var depth = theArea.attr("depth");
            areaForNewGroup.children(".notBucket").append(newGroup);
            areaForNewGroup.children(".notBucket").children(".arrangeSection").show();
            newGroup.children(".arrangeSection").hide();
            newGroup.show();
            $('#newGroupTitleArea').remove();
            $(".mainBlockCover").hide();
            areaForNewGroup.children(".selectedSection").click();
            $(".adminTrail").find("div[depth='"+depth+"']").children(".makeSortable").show();
            $(".adminTrail").find("div[depth='"+depth+"']").children(".makeGroup").show();
            if($(".adminTrail").find("div[depth='"+depth+"']").children(".notBucket").children("div:first").html() == "No Subsections Available"){
              $(".adminTrail").find("div[depth='"+depth+"']").children(".notBucket").children("div:first").remove();
            }
            
            if(windowurl.indexOf("demo=1") === -1){
                $.each(rangeCollection, function(){
                    if(this["@id"] === areaForNewGroup.attr("rangeID")){
                    var rangeObj = this;
                    var rangeList = new Array();
                    if(rangeObj.ranges.length > 0){
                        rangeList = rangeObj.ranges;
                    }
                    $.each(childrenForGroup, function(){ //remove the children being grouped from the parent
                        if($.inArray($(this).attr("rangeID"), rangeList) > -1){
                            rangeList.splice( $.inArray($(this).attr("rangeID"), rangeList), 0);
                        }
                    });
                    var forProject = detectWho();
                    var newRangeObject = {
                        "@type":"sc:Range",
                        "label": title,
                        "ranges" : children,
                        "canvases" :[],
                        "isReferencedBy":manifestID,
                        "otherContent" : [],
                        "forProject" : forProject,
                        "within" : areaForNewGroup.attr("rangeid")
                      };
                    var saveURL = "http://localhost:8080/brokenBooks/saveNewRange";
                    var params2 = {"content" : JSON.stringify(newRangeObject)};
                    var useBackup = false;
                    if(rangeList instanceof Array){
                    }
                    else{
                        useBackup = true;
                    }
                    $.post(saveURL, params2, function(data){ //save the new group
                        data = JSON.parse(data);
                        var backupArray = new Array();
                        var newGroupID = data["@id"];
                        var rangeObj2 = JSON.parse(params2.content);
                        rangeObj2["@id"] = newGroupID;
                        rangeCollection.push(rangeObj2);
                        newGroup.attr("rangeid", newGroupID);
                        newGroup.attr("relation", areaForNewGroup.attr("rangeid"));
                        newGroup.click(); //use this to reset the opened section.
                        if(useBackup){
                            backupArray.push(newGroupID);
                            rangeList = backupArray;
                        }
                        else{
                            rangeList.push(newGroupID);
                        }
                         //add new group ID to the range's range collection receiving the new group
                        var updateURL ="http://localhost:8080/brokenBooks/updateRange";
                        var paramObj2 = {"@id" : areaForNewGroup.attr("rangeID"), "ranges" : rangeList};
                        var params3 = {"content" : JSON.stringify(paramObj2)};
                        //updateInManifest("structures",paramObj2);
                        $.post(updateURL, params3, function(){ //update the range who recieved the new group's range list in the db
                            //update the ranges within that are being grouped in the new group.
                            $.each(rangeCollection, function(){
                                if(this["@id"] === areaForNewGroup.attr("rangeID")){
                                    this.ranges = rangeList;
                                }
                            });
                            $.each(children, function(){
                                var range = this;
                                var within = newGroupID;
                                var paramObj10={"@id" : range, "within" : within};
                                var params10 = {"content":JSON.stringify(paramObj10)};
                                //updateInManifest("structures",paramObj10);
                                $.post(updateURL, params10);
                            });
                            cancelNewGroupForm();
                        });
                    })
                    }
                });
            }
            else{
                $.each(rangeCollection, function(){
                    if(this["@id"] === areaForNewGroup.attr("rangeID")){
                    var rangeObj = this;
                    var rangeList = new Array();
                    if(rangeObj.ranges.length > 0){
                        rangeList = rangeObj.ranges;
                    }
                    $.each(childrenForGroup, function(){ //remove the children being grouped from the parent
                        if($.inArray($(this).attr("rangeID"), rangeList) > -1){
                            rangeList.splice( $.inArray($(this).attr("rangeID"), rangeList), 0);
                        }
                    });
                    var forProject = detectWho();
                    rangeID +=1;
                    var newRangeObject = {
                        "@id" : mockID,                        
                        "@type":"sc:Range",
                        "label": title,
                        "ranges" : children,
                        "canvases" :[],
                        "isReferencedBy":manifestID,
                        "otherContent" : [],
                        "forProject" : forProject,
                        "within" : areaForNewGroup.attr("rangeid")
                      };
                    
                    var useBackup = false;
                    if(rangeList instanceof Array){
                    }
                    else{
                        useBackup = true;
                    }
                        var backupArray = new Array();
                        rangeCollection.push(newRangeObject);
                        newGroup.attr("rangeid", mockID);
                        newGroup.attr("relation", areaForNewGroup.attr("rangeid"));
                        newGroup.click(); //use this to reset the opened section.
                        if(useBackup){
                            backupArray.push(mockID);
                            rangeList = backupArray;
                        }
                        else{
                            rangeList.push(mockID);
                        }
                         //add new group ID to the range's range collection receiving the new group
                            //update the ranges within that are being grouped in the new group.
                            $.each(rangeCollection, function(){
                                if(this["@id"] === areaForNewGroup.attr("rangeID")){
                                    this.ranges = rangeList;
                                }
                            });
                            cancelNewGroupForm();
                    }
                });
            }
           
        }
    }

  function removeFromSection(leaf, rangeID){
    $.each(rangeCollection, function(){
      if(this["@id"] === rangeID){
          var index = this.ranges.indexOf(leaf);
          this.ranges.splice(index, 1);
      }
    });
    $(".parentSection").remove();
    $(".selectedSection[rangeID='"+rangeID+"']").click();
    //ensure the one clicked is also unselected. 
    if($('.selectedSection').length == 0){ //It is directly in a new section, save the new placement, which will create the bredcumb.
      $(".parentSection").remove();
      $('.rangeArrangementArea:first').find('.unassigned').addClass("selectedSection");
    }
    //^^ local
    var getURL = "http://localhost:8080/brokenBooks/getAnnotationByPropertiesServlet";
    var paramObj1 = {"@id" : rangeID};
    var params1 = {"content" : JSON.stringify(paramObj1)};
    $.post(getURL, params1, function(data){
        if(typeof data === "object"){

        }
        else{
            data=JSON.parse(data);
        }
        var range = data[0];
        var rangeList = range.ranges;
        var index = rangeList.indexOf(leaf);
        if(index >= 0){
            rangeList.splice(index, 1);
            var newAnnoUrl = "http://localhost:8080/brokenBooks/updateRange";
            var paramObj = {"@id":rangeID, "ranges" : rangeList};
            var params = {"content" : JSON.stringify(paramObj)};
            //updateInManifest("structures",paramObj);
            $.post(newAnnoUrl, params, function(data){
                $(".parentSection").remove();
                $(".selectedSection[rangeID='"+rangeID+"']").click();
                savePlacement();
                //ensure the one clicked is also unselected. 
                if($('.selectedSection').length == 0){ //It is directly in a new section, save the new placement, which will create the bredcumb.
                  $(".parentSection").remove();
                  $('.rangeArrangementArea:first').find('.unassigned').addClass("selectedSection");
                }
            });
        }
    });  
  }
	/*
		This range is already in the manifest structures section, so what we are actually trying to do is save this leaf to the already created range.  We must check whether the leaf URI is already in the "ranges" section of the range.  There should be no duplicate URIs. 
	*/
	function updateRange(rangeID, leaf, arrange){
            //console.log("in update range with "+rangeID, leaf, arrange);
            var rangeToUpdate = {};
            var pageURL = document.location.href;
            var entry = {};
            $.each(rangeCollection, function(){
                entry = this;
                if(this["@id"] === rangeID){
                    var sectionName = this.label;
                    rangeToUpdate = this;
                    if($.inArray(leaf, this.ranges) === -1){
                        this.ranges.push(leaf);
                        if(arrange == "arrange"){
                            $.each($(".selectedSection"), function(){
                                var thisRangeID = $(this).attr("rangeID");
                                var thisName = $(this).children("span").html();
                                if($(this).hasClass("unassigned")){
                                  //do not add this to the crumb.
                                }
                                else{
                                  addedToSection = $("<div rangeID='"+thisRangeID+"' class='parentSection'><div class='parentSectionName'>"+thisName+"</div> <div class='sectionRemove' onclick=\"removeFromSection('"+leaf+"','"+thisRangeID+"');\">X</div></div>");
                                  $("#arrangeCrumb").append(addedToSection);
                                }
                            });
                        }
                    }
                    else{
                        //return false;
                    }
                }
                else if(this["@id"] === leaf){
                    entry.within = rangeID;
                }
            });

    //^^ local
    //To make this work live get the ranges of rangeID, make sure the leaf is not already a part of the ranges, push the leaf to the ranges if not, then update on the server.
            if(pageURL.indexOf("demo=1") > -1){
                return false;
            }
            var getURL = "http://localhost:8080/brokenBooks/getAnnotationByPropertiesServlet";
            var paramObj2 = {"@id" : rangeID};
            var params2 = {"content" : JSON.stringify(paramObj2)};
            $.post(getURL, params2, function(data){
                if(typeof data !== "object"){
                    rangeToUpdate = JSON.parse(data);
                }
                else{
                    rangeToUpdate = data;
                }
                
                var updateURL = "http://localhost:8080/brokenBooks/updateRange";
                if($.inArray(leaf, rangeToUpdate.ranges) === -1){
                    rangeToUpdate[0].ranges.push(leaf);
                }
                else{ //if the leaf is already in the array of children ranges, there is no need to update. consecutive locks should be good too. 
                    return false;
                }
                var paramObj = {"@id":rangeID, "ranges" : rangeToUpdate[0].ranges};
                var params = {"content" : JSON.stringify(paramObj)};
                //update the the range recieving the child's ranges array by pushing in the range being added in.
                //updateInManifest("structures",paramObj);
                $.post(updateURL, params, function(data){
                    var addedToSection = "";
                    if(arrange == "arrange"){
                        $.each($(".selectedSection"), function(){
                          var thisRangeID = $(this).attr("rangeID");
                          var thisName = $(this).children("span").html();
                          if($(this).hasClass("unassigned")){
                            //do not add this to the crumb.
                          }
                          else{
                            addedToSection = $("<div rangeID='"+thisRangeID+"' class='parentSection'><div class='parentSectionName'>"+thisName+"</div> <div class='sectionRemove' onclick=\"removeFromSection('"+leaf+"','"+thisRangeID+"');\">X</div></div>");
                            $("#arrangeCrumb").append(addedToSection);
                          }
                        });

                    }
                });
            });
            
        //^^ live
	}
	
	function resolveImageURI(rv){
		var uri = $("."+rv+"Canvas").find(".uploadness").find('textarea').val();
	    $.ajax({
	        url: uri,
	        success: function(imageData){
	            //console.log(imageData);
	        },
	        error: function(jqXHR,error, errorThrown) {  
	            alert("Image could not be resolved.  Issue: " +  jqXHR.status + " - " +jqXHR.response);
	        }
	    });
	}

	/*
		Dont save the fields and return to the image options.  
	*/

	function cancelFolio(){
		//Don't get data and return to image page
                var windowURL = document.location.href;
                
                if(windowURL.indexOf("demo=1") > -1){
                    closeLeafPopover();
                }
                else{
                    $.each($("#formTabs").find("tr"), function(){
                        if($(this).attr("set") === "set"){
                            
                        }
                        else{
                            $(this).find(".content").val("");
                        }
                    });
                    if($("#notes").attr("set") === "set"){
                            
                    }
                    else{
                        $("#notes").val("");
                    }
                }
                
//		$(".start").hide("blind", "300ms", function(){
//			$(".imgAdditionArea").show("explode", "500ms");
//			$("#catalogueInfoFor").val(''); 
//			$("#folioSide2").removeClass("selectedFolio");
//			$("#folioSide1").removeClass("selectedFolio");
//			alpha = beta = zeta = false;
//		});
	}

	/*
		Fired when user clicks "Begin preparing a leaf".  We must create the canvases and the leaf range first, then feed it information as necessary. 
	*/
	function submitIntro(test){
            var windowURL = document.location.href;
            if(test === "testEdit"){
                $("#saveText").html("Getting Leaf...");
                $("#saveCover").show();
            }
            else{
                $("#saveText").html("Creating Leaf...");
                $("#saveCover").show();
            }
            
            var forProject = detectWho();
            
            //$(".intro").hide("blind", "300ms", function(){$(".imgAdditionArea").show("explode", "500ms");});
            $(".intro").hide();
            $(".imgAdditionArea").show("explode", "500ms");
            if(test === "testEdit"){
                return false;
            }
//            if(windowURL.indexOf("demo=1") > -1){
//                gatherRangesForArrange(1); //Should we populate this for the demo
//                return false;
//            }
            gatherRangesForArrange(1);
            $(".leafPopover").show();
            var newCanvas1ServerID = -1;
            var newCanvas2ServerID = -1;
            annoListCollection = new Array(3);
            //create a new leaf range and get ID.  The leaf range will create 2 canvases whose ID's I will also need.
            canvasTag = 100;
            canvasTag = parseInt(canvasTag)+1;
            var newCanvasHolderImg = {
                "@type":"oa:Annotation",
                "motivation":"sc:painting",
                "resource":
                    {
                            
                            "format":"image/jpg",
                            "@type":"dctypes:Image",
                            
                            "@id" : "http://localhost:8080/brokenBooks/images/imgNotFound.png",
                            "service":
                                {                                       
                                    "@context": "http://iiif.io/api/image/2/context.json",
                                    "profile":"http://iiif.io/api/image/2/profiles/level2.json",
                                    "@id" : "http://localhost:8080/brokenBooks/images/imgNotFound.png"
                                },
                            "width": 667,
                            "height":1000
                    },
                    "on":""
                };
            var newCanvas1 = {
                "@id" : "http://www.example.org/iiif/LlangBrev/canvas/"+canvasTag+"", //local
                "@type" : "sc:Canvas",
                "label" : "Side A",
                "height" : 1000,
                "width" : 667,
                "images" : [],
                "forProject" : forProject,
                "otherContent": [],
                "within" : "",
                "sandbox" : "yes"
            };
            
         annoListID = parseInt(annoListID) + 1;
         $("#folioSide1").attr("onclick","enterCatalogueInfo('http://www.example.org/iiif/LlangBrev/canvases/"+canvasTag+"', 'recto');"); //local
      	 $("#folioSide1").attr("canvas","http://www.example.org/iiif/LlangBrev/canvases/"+canvasTag+""); //local
      	 //testManifest.sequences[0].canvases.push(newCanvas1); //local
      	 var url = "http://localhost:8080/brokenBooks/saveNewCanvas";
      	 var params1 = {'content': JSON.stringify(newCanvas1)};
         if(windowURL.indexOf("demo=1")>-1){
                var data = newCanvas1;
                var newCanvas1HolderImg = newCanvasHolderImg;
                newCanvas1HolderImg.on = data["@id"];
                var newCanvas1AnnoList = {
				"@id":"http://www.example.org/iiif/LlangBrev/annoList/"+annoListID, 
				"@type":"sc:AnnotationList",
				"resources" : [],
                                "forProject": forProject,
				"on" : newCanvas1["@id"],
                                "sandbox" : "yes"
       	 	}; //local
                
                annoListCollection[0] = newCanvas1AnnoList;
      	 	$("#folioSide1").attr("onclick","enterCatalogueInfo('"+data["@id"]+"', 'recto');"); 
      	 	$("#folioSide1").attr("canvas", data["@id"]); 
      	 	manifestCanvases.push(newCanvas1); //live
                var listID = newCanvas1AnnoList["@id"];
                newCanvas1.images = [newCanvas1HolderImg];
                newCanvas1.otherContent = [{"@id":listID,"@type":"sc:AnnotationList"}];
                $("#folioSide1").click();
                $("#catalogueInfoFor").val(newCanvas1["@id"]);
                alpha = true;
                beta= false;
                zeta = false;

      	 	newCanvas1ServerID = newCanvas1["@id"];
                
  	        canvasTag = parseInt(canvasTag) + 1;
                annoListID = parseInt(annoListID) + 1;

                var urlCanvas = {
                            "@id" : "http://www.example.org/iiif/LlangBrev/canvas/"+canvasTag+"",
                            "@type" : "sc:Canvas",
                            "label" : "Side B",
                            "height" : 1000,
                            "width" : 667,
                            "images" : [],
                            "forProject" : forProject,
                            "otherContent" : [],
                            "within" : "",
                            "sandbox" : "yes"
                };
                                       
                var newCanvas2 = urlCanvas;
                var newCanvas2HolderImg = newCanvasHolderImg;
                newCanvas2HolderImg.on = newCanvas2["@id"];
                newCanvas2ServerID = newCanvas2["@id"];
                $("#folioSide2").attr("onclick","enterCatalogueInfo('"+ newCanvas2["@id"]+"','verso');");
                $("#folioSide2").attr("canvas",  newCanvas2["@id"]);
                manifestCanvases.push(newCanvas2); //live
                var newCanvas2AnnoList = {
                "@id":"http://www.example.org/iiif/LlangBrev/annoList/"+annoListID, 
                "@type":"sc:AnnotationList",
                "resources" : [],
                "forProject": forProject,
                "on" :  newCanvas2["@id"]
                };
                annoListCollection[1] = newCanvas2AnnoList;
                rangeID = parseInt(rangeID) + 1;
                annoListID = parseInt(annoListID) + 1;
                var leafRangeObject = {
                    "@id" : "http://www.example.org/iiif/LlangBrev/range/"+rangeID,
                    "@type":"sc:Range",
                    "label":"New Page" ,
                    "canvases" : [
                      //newCanvas1["@id"], //local
                      //newCanvas2["@id"] //local
                      newCanvas1ServerID, //live on dev server
                      newCanvas2ServerID //live on dev server
                    ],
                    "ranges" : [],
                    "isReferencedBy":manifestID,
                    "forProject": forProject,
                    "within" : "root",
                    "otherContent" : [],
                    "lockedup" : "",
                    "lockeddown": "",
                    "isOrdered" : "",
                    "sandbox" : "yes"
                    };
                    currentLeaf = "http://www.example.org/iiif/LlangBrev/range/"+rangeID; //local
                    createNewRange(leafRangeObject, 'currentLeaf', "", "", "");
                   
         }
         else{
            $.post(url, params1, function(data){ //save first new canvas
                console.log("saved first canvas...");
      	 	data = JSON.parse(data);
      	 	newCanvas1["@id"] = data["@id"];
                var newCanvas1HolderImg = newCanvasHolderImg;
                newCanvas1HolderImg.on = data["@id"];
                annoListID = parseInt(annoListID) + 1;
                var newCanvas1AnnoList = {
                    "@id":"http://www.example.org/iiif/LlangBrev/annoList/"+annoListID, 
                    "@type":"sc:AnnotationList",
                    "resources" : [],
                    "forProject": forProject,
                    "on" : newCanvas1["@id"],
       	 	}; //local
                
                annoListCollection[0] = newCanvas1AnnoList;
      	 	$("#folioSide1").attr("onclick","enterCatalogueInfo('"+data["@id"]+"', 'recto');"); 
      	 	$("#folioSide1").attr("canvas", data["@id"]); 
      	 	//testManifest.sequences[0].canvases.push(newCanvas1); //live
                
        	//save anno list for new canvas
                //annoListCollection[0] = newCanvas1AnnoList;
        	var listURL1 = "http://localhost:8080/brokenBooks/saveNewRange";
        	var listParams1 = {"content" : JSON.stringify(newCanvas1AnnoList)};
        	$.post(listURL1, listParams1, function(data){ //save first canvas annotation list
                    //add holder img annotation in to images field.
                        console.log("saved first canvas anno list");
        		data = JSON.parse(data);
        		annoListCollection[0]["@id"] = data["@id"];
                        var listID = data["@id"];
        		var updateCanvasURL = "http://localhost:8080/brokenBooks/updateCanvas";
                        var imgAnno = {"@id":newCanvas1["@id"], "images":[newCanvas1HolderImg]};
        		var imgParams = {"content":JSON.stringify(imgAnno)};
                        newCanvas1.otherContent =[{"@id":listID,"@type":"sc:AnnotationList"}];
                        manifestCanvases.push(newCanvas1); //live
        		$.post(updateCanvasURL, imgParams, function(data){
                            console.log("update canvas image with new image anno, we had to wait to sait on property.");
                            var paramObj = {"@id":newCanvas1["@id"], "otherContent":[{"@id":listID,"@type":"sc:AnnotationList"}]};
                            var params = {"content":JSON.stringify(paramObj)};
                            $.post(updateCanvasURL, params, function(data){
                                console.log("update canvas other content");
                                $("#folioSide1").click();
                                $("#catalogueInfoFor").val(newCanvas1["@id"]);
                                alpha = true;
                                beta= false;
                                zeta = false;
                            });
        		});
      
        	});
      	 	newCanvas1ServerID = newCanvas1["@id"];
  	        canvasTag = parseInt(canvasTag) + 1;
                annoListID = parseInt(annoListID) + 1;
                var urlCanvas = {
                            "@id":"http://www.example.org/iiif/LlangBrev/canvas/"+canvasTag+"",
                            "@type" : "sc:Canvas",
                            "label" : "Side B",
                            "height" : 1000,
                            "width" : 667,
                            "images" : [],
                            "forProject" : forProject,
                            "otherContent" : [],
                            "within" : "",
                            "sandbox" : "yes"
                };
                                       
	      	var params2 = {'content': JSON.stringify(urlCanvas)};
	      	$.post(url, params2, function(data){
                        console.log("saved second canvas");
                        var newCanvas2 = urlCanvas;
	      		data=JSON.parse(data);
                        newCanvas2["@id"] = data["@id"];
                        var newCanvas2HolderImg = newCanvasHolderImg;
                        newCanvas2HolderImg.on = data["@id"];
                        newCanvas2ServerID = newCanvas2["@id"];
      	 		$("#folioSide2").attr("onclick","enterCatalogueInfo('"+ newCanvas2["@id"]+"','verso');");
      	 		$("#folioSide2").attr("canvas",  newCanvas2["@id"]);
      	 		//testManifest.sequences[0].canvases.push(newCanvas2); //live
                        
                        var newCanvas2AnnoList = {
	                "@id":"http://www.example.org/iiif/LlangBrev/annoList/"+annoListID, 
	                "@type":"sc:AnnotationList",
	                "resources" : [],
                        "forProject": forProject,
	                "on" :  newCanvas2["@id"],
                        "sandbox" : "yes"
	        	};
                        annoListCollection[1] = newCanvas2AnnoList;
                        var listURL2 = "http://localhost:8080/brokenBooks/saveNewRange";
	        	var listParams2 = {"content" : JSON.stringify(newCanvas2AnnoList)};
	        	var canvasID = newCanvas2["@id"];
	        	$.post(listURL2, listParams2, function(data){
                            console.log("saved second canvas list");
	        		data = JSON.parse(data);
                                annoListCollection[1]["@id"] = data["@id"];
                                var listID = data["@id"];
	        		var updateCanvasURL = "http://localhost:8080/brokenBooks/updateCanvas";
                                var imgAnno2 = {"@id":canvasID, "images":[newCanvas2HolderImg]};
                                var imgParams2 = {"content":JSON.stringify(imgAnno2)};
                                newCanvas2.otherContent = [{"@id":listID, "@type":"sc:AnnotationList"}];
                                manifestCanvases.push(newCanvas2); //live
                                $.post(updateCanvasURL, imgParams2, function(data){
                                    console.log("update second canvas image");
                                    var paramObj = {"@id":canvasID, "otherContent":[{"@id":listID, "@type":"sc:AnnotationList"}]};
                                    var params = {"content":JSON.stringify(paramObj)};
                                    $.post(updateCanvasURL, params, function(data){
                                        updateManifestSequence();
                                    });
                                });
	        	});
                        rangeID = parseInt(rangeID) + 1;
                        annoListID = parseInt(annoListID) + 1;
                        var leafRangeObject = {
                            "@id" : "http://www.example.org/iiif/LlangBrev/range/"+rangeID,
                            "@type":"sc:Range",
                            "label":"New Page" ,
                            "canvases" : [
                              //newCanvas1["@id"], //local
                              //newCanvas2["@id"] //local
                              newCanvas1ServerID, //live on dev server
                              newCanvas2ServerID //live on dev server
                            ],
                            "resources" : [],
                            "ranges" : [],
                            "isReferencedBy":manifestID,
                            "forProject": forProject,
                            "within" : "bucket", //dont want these to appear until placed
                            "otherContent" : [],
                            "lockedup" : "",
                            "lockeddown": "",
                            "isOrdered" : "",
                            "sandbox" : "yes"
                            };
                            currentLeaf = "http://www.example.org/iiif/LlangBrev/range/"+rangeID; //local
                            createNewRange(leafRangeObject, 'currentLeaf', "", "", "");

                        });
                    });
             }
            
	}

	function removeInfo(listItem){
		var serverID = listItem.attr("annoserverid");
		var url = "http://localhost:8080/brokenBooks/deleteAnnotationByAtIDServlet";
		var paramObj = {"@id" : serverID};
		var params = {"content" : JSON.stringify(paramObj)};
		$.post(url, params, function(data){
			listItem.remove();
		});
	}

	function admin(){
		admin=true; contributer=false;
		$("#whoCreates").html("the project admin.");
		$("#beAdmin").hide();
		$("#beContributer").show();
	}

	function contributer(){
		admin=false; contributer=true;
		$("#whoCreates").html("a contributer.");
		$("#beAdmin").show();
		$("#beContributer").hide();
	}
        
    function updateImageAnno(which){
        //console.log("IMAGE!");
        var windowurl = document.location.href;
        if(which === "alpha"){
            var updateCanvasURL = "http://localhost:8080/brokenBooks/updateCanvas";
            var image = $('textarea[rv="recto"]').val();
            var canvas = $("#folioSide1").attr("canvas");
            var img = new Image();
            img.onload = function(){
              var height = img.height;
              var width = img.width;
              //console.log("image loaded, pass w and h"+width,height);
              if(windowurl.indexOf("demo=1") === -1){
                 updateCanvasDimensions(canvas,width, height);
              }
              // code here to use the dimensions
            }
            image = image.trim();
            img.src = image;
            var anno = {
                            "format":"image/jpg",
                            "@type":"dctypes:Image",
                            "resource":
                            {
                                "@id": image,
                                "service":
                                    {                                       
                                        "@context": "http://iiif.io/api/image/2/context.json",
                                        "profile":"http://iiif.io/api/image/2/profiles/level2.json",
                                        "@id" : image
                                    },
                                "width": 667, //how should I set these?
                                "height":1000 //how should I set these?
                            },
                            "on" : canvas
                        };
              
              var paramObj = {"@id": $("#folioSide1").attr("canvas"), "images":[anno]};
              var params = {"content":JSON.stringify(paramObj)};
              if(windowurl.indexOf("demo=1") > -1){
                $(".rectoImg").attr("src", image);
              }
              else{
                //updateInManifest("sequences",paramObj);
                $.post(updateCanvasURL, params, function(data){
                    $(".rectoImg").attr("src", image);
                });
              }
      }
      else{
            var updateCanvasURL = "http://localhost:8080/brokenBooks/updateCanvas";
            var image = $('textarea[rv="verso"]').val();
            var canvas = $("#folioSide2").attr("canvas");
            var img = new Image();
            img.onload = function(){
              var height = img.height;
              var width = img.width;
              //console.log("image loaded, pass w and h"+width,height);
              if(windowurl.indexOf("demo=1") === -1){
                updateCanvasDimensions(canvas,width, height);
              }
              // code here to use the dimensions
            }
            image = image.trim();
            img.src = image;
              var anno = {
                            "format":"image/jpg",
                            "@type":"dctypes:Image",
                            "resource":
                            {
                                "@id": image,
                                "service":
                                    {                                       
                                        "@context": "http://iiif.io/api/image/2/context.json",
                                        "profile":"http://iiif.io/api/image/2/profiles/level2.json",
                                        "@id" : image
                                    },
                                "width": 667, //how should I set these?
                                "height":1000 //how should I set these?
                            },
                            "on" : canvas
                        };
              var paramObj = {"@id": $("#folioSide2").attr("canvas"), "images":[anno]};
              var params = {"content":JSON.stringify(paramObj)};
              if(windowurl.indexOf("demo=1") > -1){
                  $(".versoImg").attr("src", image);
              }
              else{
                //updateInManifest("sequences",paramObj);
                $.post(updateCanvasURL, params, function(data){
                   $(".versoImg").attr("src", image);
                });
              }
              
      }
      $(".uploadness").hide();
  }
  
    function updateCanvasDimensions(canvas, width, height){
        //console.log("updating canvas "+canvas+" with dimensions "+width+" x "+height);
        var updateURL = "http://localhost:8080/brokenBooks/updateCanvas";
        var paramObj = {"@id": canvas, "height":height, "width":width};
        var params = {"content":JSON.stringify(paramObj)};
        //updateInManifest("sequences",paramObj);
        $.post(updateURL, params, function(data){
        });
    }
           
  function breakUpConfirm(event){
      var tagName = event.target.tagName;
      var className = event.target.className;
      targetToBreak = undefined;
      if(className.indexOf("selectedSection") > -1){
          alert("You cannot break an opened section.");
          return false;
      }
      if(tagName == "SPAN" || tagName == "INPUT" || className.indexOf("folioCount") > -1){
          var parent = "";
          if(className.indexOf("countInt") > -1){
              parent = event.target.parentNode.parentNode;
          }
          else{
              parent = event.target.parentNode;
          }
          targetToBreak = parent;
      }
      else{
          targetToBreak = event.target;
      }
      
      var confirm = '';
//      console.log("Check for lock before allowing break");
//      console.log(targetToBreak.className);
//      console.log(targetToBreak.parentNode.getAttribute("isOrdered"));
      if(targetToBreak.className.indexOf("ordered") > -1 || targetToBreak.parentNode.getAttribute("isOrdered") === "true"){
          //console.log("Locked, dont break");
           confirm = $("<div class='breakConfirm'><div class='popHdr' style='position: relative; font-size: 14px; top:0px;  left:0px;'>locked!</div>\n\
           <div class='demoContent'><input value='OK' type='button' onclick='$(this).parent().parent().remove()'/></div></div>");
      }
      else{
          //console.log("breakable");
          var question = "break?";
          //If it is a leaf or empty section, we are deleting not breaking.
          if(targetToBreak.getAttribute("leaf") === "true" || $(targetToBreak).children(".arrangeSection").length === 0){
              question = 'delete?';
          }
            confirm= $("<div class='breakConfirm'><div class='popHdr' style='position: relative; font-size: 14px; top:0px;  left:0px;'>"+question+"</div>\n\
            <div class='demoContent'>\n\
            <input value='Yes' type='button' onclick=\"breakUp();\" /><input value='No' type='button' onclick='$(this).parent().parent().remove()'/>\n\
            </div>\n\
            </div>");
      }
      var x = event.pageX;
      var y = event.pageY;
      if($(".breakConfirm").length == 0){
        $('body').append(confirm);
        confirm.css({
          "left" : x+"px",
          "top" : y+"px"
        });
      }
  }
  
  /* 
   * Remove a leaf from the manifest.  This means removing a range from the server and the manifest, and removing 2 canvases from the server and the manifest.
   * we do not remove the annotation lists or the annotations, which we need to do I believe, I need to double check this in the back end. FIXME.
   *  */
  function removeLeaf(rangeID2, canvases){
//      console.log("removing leaf: "+rangeID2);
//      console.log("removing canvases: "+canvases);
      var windowurl = document.location.href;
      if(windowurl.indexOf("demo=1")>-1){
          $(targetToBreak).remove();
      }
      else{
        var removeURL = "http://localhost:8080/brokenBooks/deleteAnnotationByAtIDServlet";
        var paramObj = {"@id" : rangeID2};
        var params = {"content" : JSON.stringify(paramObj)};
        $.each(rangeCollection,function(index){
            if(this["@id"] === rangeID2){
                rangeCollection.splice(index,1);
                updateManifestStructures();
                return false;
            };
        });
        $.post(removeURL, params, function(){
            var deleteDepth = parseInt($(targetToBreak).parents(".rangeArrangementArea").attr("depth"));
            $(targetToBreak).remove();
            //update the folio count since deleting the leaf removed the page.  
            //Need to go up the selectedSection latter and decrement the folio count that way.  The element inside the
            //section is not removed until collapsed, so this wont work.
            $.each($(".selectedSection"), function(){
                var sectionDepth = parseInt($(this).parents(".rangeArrangementArea").attr("depth"));
                if($(this).attr("leaf") !== "true" && $(this).attr("isOrdered") !== "true" && sectionDepth < deleteDepth){
                    var folioCount = $(this).children(".folioCount").children(".countInt").html();
                    folioCount = parseInt(folioCount) - 1;
                    var folioCountHTML = $(this).children(".folioCount:first");
                    folioCountHTML.children(".countInt").html(folioCount);
                }
            });
            var paramObj2 = {"@id":canvases[0]};
            var params2 = {"content" : JSON.stringify(paramObj2)}; 
            //Below is the unique case of needing to remove the canvases and update the manifest sequences with them removed, it is not broken out into a separate function.
            $.post(removeURL, params2, function(){
                var paramObj3 = {"@id":canvases[1]};
                var params3 = {"content" : JSON.stringify(paramObj3)}; 
                $.post(removeURL, params3, function(){
                    var matches = 0;
                    var length = manifestCanvases.length;
                    $.each(manifestCanvases, function(index){
                        if(this["@id"]===canvases[0]["@id"] || this["@id"]===canvases[1]["@id"]){
                            manifestCanvases.canvases.splice(index,1);
                            if(matches === 2 || index === length){
                                updateManifestSequence();
                                return false;
                            }
                        }
                    });
                });
            });
            //console.log("All 3 removed");
        });
        //removeAnnosOn(canvases); //TODO?  Or does the back end already handle this?  I dont know...
      }
  }
  
  function removeRange(rangeID2){
      var windowurl = document.location.href;
      if(windowurl.indexOf("demo=1")>-1){
          $(targetToBreak).remove();
      }
      else{
        $.each(rangeCollection,function(index){
            if(this["@id"] === rangeID2){
                rangeCollection.splice(index,1);
                updateManifestStructures();
                return false;
            };
        });
        var removeURL = "http://localhost:8080/brokenBooks/deleteAnnotationByAtIDServlet";
        var paramObj = {"@id" : rangeID2};
        var params = {"content" : JSON.stringify(paramObj)}; 
        $.post(removeURL, params, function(){
            $(targetToBreak).remove();
        });
      }
      
  }
  
  function removeAndUpdate(remove, update, bringup, leaf){
      console.log("Break up led to remove and update");
      var fireUpdate = true;
      var windowurl = document.location.href;
      var updateURL ="http://localhost:8080/brokenBooks/updateRange";
      if(windowurl.indexOf("demo=1")>-1){
          removeRange(remove);
      }
      $.each(rangeCollection, function(){
          if(this["@id"] === update){
                var range = this;
                var rangeList = range.ranges;
                if(rangeList!==undefined && rangeList.length > 0){
                    var index = $.inArray(remove, rangeList);
                    if(index === -1){
                        //I don't think this part of the code will get hit anymore, but leave it in here anyway.  
                       console.log("removing from bucket, dont fire update.  SHOULD NOT FIRE.");
                       if(leaf === "leaf"){
                           removeLeaf(remove, bringup);
                       }
                       else{
                           removeRange(remove);
                       }
                       fireUpdate = false;
                    }
                    else{
                        console.log("Remove child range out of parent range ranges list");
                        rangeList.splice(index , 1 ); //remove range that is being deleted;
                    }
                }

                if(fireUpdate){ //only go to this part if the range we want was actually in the array we lookedi n. 
                  if(bringup.length > 0 && (leaf===undefined || leaf !== "leaf")){ //There are children that need to be brought up from the section being removed.
                      //bringup is an array of those children's ids, merge them at the end of the current range list.  If it is a leaf, those are canvases.  
                     rangeList =  $.merge(rangeList, bringup);
                     $.each(bringup, function(){
                        var paramObj2 = {"@id" : this, "within" : update};
                        var params2 = {"content" : JSON.stringify(paramObj2)};
                        //updateInManifest("structures", paramObj2);
                        $.post(updateURL, params2);
                    });
                  }
                  console.log("set manifest range.ranges list with the spliced out range.");
                   this.ranges = rangeList; //make sure the rangeCollection object has the changes for the update to the manifest object!
                   var paramObj1 = {"@id" : update, "ranges" : rangeList};
                   var params1 = {"content" : JSON.stringify(paramObj1)};
                   if(windowurl.indexOf("demo=1")===-1){
                        //we need to update the structures.  The leaf has been removed from the particular range it was placed in.  
                        $.post(updateURL, params1, function(){
                            
                        });
                        if(leaf === "leaf"){
                            //console.log("Remove LLLLLLLLLLLLLEAF");
                            removeLeaf(remove, bringup);
                        }
                        else{
                            removeRange(remove); //delte the range entirely from the db
                        }
                   }
                   
              }
          }
      });
        
  }

  function breakUp(){
      var group = $(targetToBreak);
      var parent = group.closest(".rangeArrangementArea");
      
      $(".breakConfirm").remove();
      var childrenToBringUp = undefined;
      var depth = -1;
      var childrenArray = [];
      if(group.attr("leaf") === "true"){
          //group.remove();
          $.each(rangeCollection, function(){
              if(this["@id"] === group.attr("rangeid")){
                  var canvases = this.canvases;
                  childrenArray = canvases;
                  removeAndUpdate(group.attr("rangeID"), parent.attr("rangeID"), childrenArray, "leaf");
              }
          });
          
      }
      else{
          depth = parseInt(group.parent().parent().attr("depth"));
          if(group.children(".arrangeSection").length > 0){
                childrenToBringUp = group.children(".arrangeSection");
                $.each(childrenToBringUp, function(){
                    childrenArray.push($(this).attr("rangeID"));
                    $(".adminTrail").find("div[depth='"+depth+"']").children(".notBucket").append($(this));
                    $(this).show();
                });
                removeAndUpdate(group.attr("rangeID"), parent.attr("rangeID"), childrenArray);
          }
          else{
              removeAndUpdate(group.attr("rangeID"), parent.attr("rangeID"), childrenArray);
          }
      }
       
  }

  function newGroupForm(column){
      //all leaves arent always gathered, perhaps make sure they are here.
      $("#newGroupForm").show();
      $(".mainBlockCover").show();
      var columnDepth = parseInt(column.attr("depth"));
      $("#saveGroupForm").attr("onclick", "saveNewGroupForm("+columnDepth+");");
      if($("#allLeaves").children().length == 0){
          for(var i = 0; i<allLeaves.length; i++){
              var rangeID2 = allLeaves[i]["@id"];
              var leafLabel = allLeaves[i].label;
              var htmlLeaf = $("<div class='areaLeaf'><input label='"+leafLabel+"' rangeID='"+rangeID2+"' class='areaLeafBox' type='checkbox'/>"+leafLabel+"</div>");
              $("#allLeaves").append(htmlLeaf);
          }
      }
      else{
          //do not populate, they are already there
      }
      
  }

  function saveNewGroupForm(depth){
    var windowURL = document.location.href;
      var uniqueID = ($(".arrangeSection").length * 10) + 1;
      var dragAttribute = "id='drag_"+uniqueID+"' draggable='true' ondragstart='dragHelp(event);' ondragend='dragEnd(event);'";
      var dropAttribute = "ondragover='dragOverHelp(event);' ondrop='dropHelp(event);'";
      var rightClick = "oncontextmenu='breakUpConfirm(event); return false;'";
      var title=$("#groupTitle").val();
      var toggle1 = "onclick='toggleChildren($(this),\"admin\",event);'";
      var childLeaves = [];
      
      if(title == ""){
          $(".noTitleWarning").show();
          setTimeout($('.noTitleWarning').fadeOut(1000), 2000);
      }
      else{
          var checkedLeaves = $("#allLeaves").find("input:checked");
          var leafCount = checkedLeaves.length;
          var leafCountHTML = $("<span class='folioCount'><span class='countInt'>"+leafCount+"</span><img class='pageIcon' src='http://localhost:8080/brokenBooks/images/b_page.png'/></span>");
          var bucket = $("div[depth='1']").find(".unassigned");
          var bucketCount = parseInt(bucket.find(".folioCount").find(".countInt").html());
          rangeID = parseInt(rangeID) + 1;
          var mockID= "http://www.example.org/iiif/LlangBrev/range/"+rangeID;
          var newGroup = $("<div rangeID='"+mockID+"' leaf='false' class='arrangeSection child sortOrder' "+dragAttribute+" "+dropAttribute+" "+rightClick+" "+toggle1+" ><span>"+title+"</span><input class='putInGroup' type='checkbox' /></div>");
          if(depth ===1){
            newGroup.removeClass("child").addClass("parent");
          };
          $.each(checkedLeaves, function(){
              var rangeForNewGroup = $(".adminTrail").find("div[depth='"+depth+"']").attr("rangeID");
              var leafID = $(this).attr("rangeID");
              var leafLabel = $(this).attr("label");
              var lockUp = "lock('"+leafID+"','up',event);";
              var lockDown = "lock('"+leafID+"','down',event);";
              var existing = "<span onclick=\"existing('"+leafID+"','"+rangeForNewGroup+"')\" class='folioCount'><img class='leafIcon' src='http://localhost:8080/brokenBooks/images/leaf.png'/></span>";
              $.each(allLeaves, function(){
                  if(this["@id"] == leafID){
                      childLeaves.push(this["@id"]);
                      uniqueID += 1;
                      dragAttribute = "id='drag_"+uniqueID+"' draggable='true' ondragstart='dragHelp(event);' ondragend='dragEnd(event);'";
                      var lockit = "<div class='lockUp' onclick='"+lockUp+"'> </div><div class='lockDown' onclick='"+lockDown+"'> </div>";
                      var newLeaf = $("<div rangeID='"+leafID+"' leaf='true' class='arrangeSection child sortOrder' "+dragAttribute+" "+rightClick+" "+toggle1+"><span>"+leafLabel+"</span><input class='putInGroup' type='checkbox' />"+lockit+" "+existing+"</div>");
                      newGroup.append(newLeaf);
                      if(bucket.children(".arrangeSection[rangeid='"+leafID+"']").length > 0){
                            bucket.children(".arrangeSection[rangeid='"+leafID+"']").remove();
                            bucketCount -= 1;
                            bucket.find(".folioCount").find(".countInt").html(bucketCount);
                      }
                  }
              });
          });
          newGroup.append(leafCountHTML);

          if(windowURL.indexOf("demo=1") > -1){
               $(".adminTrail").find("div[depth='"+depth+"']").find(".notBucket").append(newGroup); //append the new group object to the DOM
                newGroup.show();
                $(".adminTrail").find("div[depth='"+depth+"']").children(".makeSortable").show();
                $(".adminTrail").find("div[depth='"+depth+"']").children(".makeGroup").show();
                if($(".adminTrail").find("div[depth='"+depth+"']").children(".notBucket").children("div:first").html() == "No Subsections Available"){
                  $(".adminTrail").find("div[depth='"+depth+"']").children(".notBucket").children("div:first").remove();
                }
                cancelNewGroupForm();
          }
          else{
              var rangeForNewGroup = $("div[depth='"+depth+"']").attr("rangeid");
              newGroupUpdate(rangeForNewGroup, childLeaves, newGroup, depth);
          }
          
      }
  }
  
  //
  function newGroupUpdate(range, children, $newGroup, depth){
    //check if children are a part of the parent aggr ranges and if so, splice them
    var getURL = "http://localhost:8080/brokenBooks/getAnnotationByPropertiesServlet";
    var windowURL = document.location.href;
    var paramObj = {"@id" : range};
    var params = {"content" : JSON.stringify(paramObj)};
    var forProject = detectWho();
    var newRangeObject = {
            "@type":"sc:Range",
            "label": $("#groupTitle").val(),
            "ranges" : children,
            "canvases" :[],
            "resources" : [],
            "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
            "otherContent" : [],
            "within": range,
            "forProject" : forProject,
            "isReferencedBy":manifestID,
            "lockedup" : "",
            "lockeddown": "",
            "isOrdered" : ""
        };
    $.post(getURL, params, function(data){ //get list of ranges currently in parent receiving grouping
        data= JSON.parse(data);
        var rangeObj = data[0];
        var rangeList = rangeObj.ranges;
        var saveURL = "http://localhost:8080/brokenBooks/saveNewRange";
        var params2 = {"content" : JSON.stringify(newRangeObject)};
        $.post(saveURL, params2, function(data){ //save the new group
            data = JSON.parse(data);
            var newGroupID = data["@id"];
            newRangeObject["@id"] = newGroupID;
            //manifest.structures.push(newRangeObject);
            rangeCollection.push(newRangeObject);
            //updateManifestStructures(); 
            rangeList.push(newGroupID); //add new group ID to the range's range collection receiving the new group
            var relation = $(".adminTrail").find("div[depth='"+depth+"']").attr("rangeid");
            $newGroup.attr("rangeid", newGroupID).attr("relation", relation);
            var updateURL ="http://localhost:8080/brokenBooks/updateRange";
            var paramObj2 = {"@id" : range, "ranges" : rangeList};
            var params3 = {"content" : JSON.stringify(paramObj2)};
            //updateInManifest("structures", paramObj2);
            $.post(updateURL, params3, function(){ //update the range who recieved the new group's range list in the db
                $(".adminTrail").find("div[depth='"+depth+"']").find(".notBucket").append($newGroup); //append the new group object to the DOM
                $newGroup.show();
                $(".adminTrail").find("div[depth='"+depth+"']").children(".makeSortable").show();
                $(".adminTrail").find("div[depth='"+depth+"']").children(".makeGroup").show();
                if($(".adminTrail").find("div[depth='"+depth+"']").children(".notBucket").children("div:first").html() == "No Subsections Available"){
                  $(".adminTrail").find("div[depth='"+depth+"']").children(".notBucket").children("div:first").remove();
                }
                if($("div[depth='1']").find(".unassigned").attr("class").indexOf("selectedSection") > -1){
                    $("div[depth='1']").find(".unassigned").click();
                }
                $.each(children, function(){
                    //TODO: Could do a batch update here.
                    var updateURL ="http://localhost:8080/brokenBooks/updateRange";
                    var paramObj3 = {"@id" : this, "within" : newGroupID};
                    var params4 = {"content" : JSON.stringify(paramObj3)};
                    $("div[depth='1']").find(".unassigned").children("div[rangeID='"+this+"']").remove();
                    //updateInManifest("structures", paramObj3);
                    $.post(updateURL, params4, function(){
                        
                    });
                });
                cancelNewGroupForm();
            });
        });
    });
  }

function cancelNewGroupForm(){
  $("#newGroupForm").find('input[type=checkbox]:checked').removeAttr('checked');
  $("#newGroupForm").hide();
  $(".mainBlockCover").hide();
  $("#groupTitle").val("");
}

function existing(leaf, leafIsIn){
    var windowURL = document.location.href;
    var alphaCanvasURI = "http://www.example.org/iiif/LlangBrev/canvas/1";
    var betaCanvasURI = "http://www.example.org/iiif/LlangBrev/canvas/2";
    var alphaCanvasObj = {};
    var betaCanvasObj = {};
    var alphaImage  = "http://localhost:8080/brokenBooks/images/addImg.jpg";
    var betaImage = "http://localhost:8080/brokenBooks/images/addImg.jpg";
    var alphaLabel = "Folio Side A Label";
    var betaLabel = "Folio Side B Label";
    var leafLabel = "Leaf Label";
    $("#createMini").hide();
    $("#createMini").parent().children(".mainBlockCover").hide();
    $("#ordering").children(".mainBlock").children(".mainBlockCover").hide();
        //var leaf = "http://localhost:8080/annotationstore/annotation/554ce6d0e4b0f1c678d2a549";
    if(leaf !== undefined){
        var leafObject = undefined;
        currentLeafServerID = leaf;
        $.each(rangeCollection, function(){
            //For the demo, you can cheat and not make the calls by making a mock list above and using it.  
            if(this["@id"] == leaf){
                leafObject = this;
                alphaCanvasURI = this.canvases[0];
                if(this.label !== ""){
                  leafLabel = this.label;
                }
                var leafAnnoList = ""; //anno list URIS
                if(this.otherContent && this.otherContent[0] && this.otherContent[0]["@id"]!==undefined && this.otherContent[0]["@id"]!=="" && this.otherContent[0]["@id"].indexOf("LlangBrev")===-1){
                    leafAnnoList = this.otherContent[0]["@id"];
                    $.ajax({
                        "url":leafAnnoList,
                        success: function(annoList3){
                            if(typeof annoList3 !== "object"){
                                annoList3 = JSON.parse(annoList3);
                            }
                            var tmpResources = annoList3.resources;
                            if(typeof tmpResources !== "object"){
                                tmpResources = tmpResources.replace('\"', '"');
                                tmpResources = JSON.parse(tmpResources);
                            }
                            annoList3.resources = tmpResources;
                            annoListCollection[2] = annoList3;
                        }
                    });//live
                }
                else{
                    leafAnnoList = "";
                    //leafAnnoList = "http://www.example.org/iiif/LlangBrev/annoList/empty";
                    annoListCollection[2] = {"@id":"empty","resources":[]};
                    
                }
                
                $("#oneAndtwo").attr("canvas", leaf);
                $("#oneAndtwo").attr("onclick","enterCatalogueInfo('leaf');"); ;
                $("#leafLabel").val(leafLabel);
                $("#oneAndtwoLabel").val(leafLabel);
                var alphaAnnoList = "";
                var betaAnnoList = "";
                var leafAnnoList = "";
                if(windowURL.indexOf("demo=1") > -1){
                    $.each(manifestCanvases, function(){
                      if(this["@id"] == alphaCanvasURI){
                        if(this.otherContent && this.otherContent[0]){
                             alphaAnnoList = this.otherContent[0]["@id"];
                        }
                        else{
                            alphaAnnoList = "";
                            annoListCollection[0] = {"@id":"empty","resources":[]};
                            //alphaAnnoList = "http://www.example.org/iiif/LlangBrev/annoList/empty";
                            //annoListCollection[0] = [];
                        }
                        if(this.label !== ""){
                          alphaLabel = this.label;
                        }
                        //console.log("checking for alpha image");
                        
                        if(this.images && this.images.length > 0){
                            if(this.images[0].resource["@id"].indexOf("imgNotFound") > -1){
                                
                            }
                            else if (this.images[0].resource["@id"] === ""){
                                
                            }
                            else{
                                //console.log("FOUND ALPHA");
                                alphaImage = this.images[0].resource["@id"];
                            }
                            if(alphaImage.indexOf("addImg") > -1 || alphaImage.indexOf("imgNotFound") > -1){
                                $("#oneAndtwo").find(".rectoImg").attr("src","http://localhost:8080/brokenBooks/images/imgNotFound.png");
                                $("#leafTmp").find(".rectoImg").attr("src","http://localhost:8080/brokenBooks/images/imgNotFound.png");
                                $("#folioSide1").find(".rectoImg").attr("src","http://localhost:8080/brokenBooks/images/addImg.jpg");
                            }
                            else{
                                $(".rectoImg").attr("src", alphaImage);
                            }
                        }
                            $("#folioSide1").attr("onclick","enterCatalogueInfo('"+alphaCanvasURI+"', 'recto');"); 
                            $("#folioSide1").attr("canvas", alphaCanvasURI);
                            $("#folioSide1").click();
                        
                      }
                    });
                }
                else{
                    //get the canvas information
                    $.ajax({
                    "url":alphaCanvasURI,
                    success: function(alphaCanvasData){
                        if(typeof alphaCanvasData!== "object"){
                            alphaCanvasData = JSON.parse(alphaCanvasData);
                        }
                        alphaCanvasObj = alphaCanvasData;
                        if(alphaCanvasData.otherContent && alphaCanvasData.otherContent[0]){
                             alphaAnnoList = alphaCanvasData.otherContent[0]["@id"];
                        }
                        else{
                            alphaAnnoList = "";
                        }
                        if(alphaCanvasData.label !== undefined && alphaCanvasData.label !== ""){
                          alphaLabel = alphaCanvasData.label;
                        }
                        if(alphaCanvasData.images && alphaCanvasData.images.length > 0){
                            if(alphaCanvasData.images[0].resource["@id"].indexOf("imgNotFound") > -1){
                                
                            }
                            else if (alphaCanvasData.images[0].resource["@id"] === ""){
                                
                            }
                            else{
                                alphaImage = alphaCanvasData.images[0].resource["@id"];
                            }
                        }
                        $.ajax({
                            "url":alphaAnnoList,
                            success: function(annoList1){
                                if(typeof annoList1!== "object"){
                                    annoList1 = JSON.parse(annoList1);
                                }
                                var tmpResources = annoList1.resources;
                                if(typeof tmpResources !== "object"){
                                    tmpResources = tmpResources.replace('\"', '"');
                                    tmpResources = JSON.parse(tmpResources);
                                }
                                annoList1.resources = tmpResources;
                                annoListCollection[0] = annoList1;
                                $("#folioSide1").attr("onclick","enterCatalogueInfo('"+alphaCanvasURI+"', 'recto');"); 
                                $("#folioSide1").attr("canvas", alphaCanvasURI);
                                $("#folioSide1").click();
                                //console.log("populate from existing");
                                populateAnnoForms();
                            }
                        }); //live
                        if(alphaImage.indexOf("addImg") > -1 || alphaImage.indexOf("imgNotFound") > -1){
                            $("#oneAndtwo").find(".rectoImg").attr("src","http://localhost:8080/brokenBooks/images/imgNotFound.png");
                            $("#leafTmp").find(".rectoImg").attr("src","http://localhost:8080/brokenBooks/images/imgNotFound.png");
                            $("#folioSide1").find(".rectoImg").attr("src","http://localhost:8080/brokenBooks/images/addImg.jpg");
                        }
                        else{
                            $(".rectoImg").attr("src", alphaImage);
                        }
                        //$("#folioSide1").addClass("selectedFolio");
                        $("#folio1Label").val(alphaLabel);
                        
                    }
                    }); //live
                }
                betaCanvasURI = this.canvases[1];
                if(windowURL.indexOf("demo=1") > -1){
                    $.each(manifestCanvases, function(){
                      if(this["@id"] == betaCanvasURI){
                        if(this.otherContent && this.otherContent[0]){
                            betaAnnoList = this.otherContent[0];
                        }
                        else{
                            betaAnnoList = "";
                            //betaAnnoList = "http://www.example.org/iiif/LlangBrev/annoList/empty";
                            annoListCollection[1] = {"@id":"empty","resources":[]};
                        }
                        if(this.label!== ""){
                          betaLabel = this.label;
                        }
                        //console.log("lloking for beta image");
                        if(this.images && this.images.length > 0){
                            if(this.images[0].resource["@id"].indexOf("imgNotFound") > -1){
                                
                            }
                            else if (this.images[0].resource["@id"] === ""){
                                
                            }
                            else{
                                //console.log("BETA IMAGE FOUND");
                                betaImage = this.images[0].resource["@id"];
                                if(betaImage.indexOf("addImg") > -1 || betaImage.indexOf("imgNotFound") > -1){
                                    $("#oneAndtwo").find(".versoImg").attr("src","http://localhost:8080/brokenBooks/images/imgNotFound.png");
                                    $("#leafTmp").find(".versoImg").attr("src","http://localhost:8080/brokenBooks/images/imgNotFound.png");
                                    $("#folioSide1").find(".versoImg").attr("src","http://localhost:8080/brokenBooks/images/addImg.jpg");
                                }
                                else{
                                    $(".versoImg").attr("src", betaImage);
                                }
                            }
                        }
                         $("#folioSide2").attr("onclick","enterCatalogueInfo('"+betaCanvasURI+"', 'verso');"); 
                         $("#folioSide2").attr("canvas", betaCanvasURI); 
                      }
                    });
                }
                else{
                    $.ajax({
                    "url":betaCanvasURI,
                    success: function(betaCanvasData){
                        race2 = true;
                        if(typeof betaCanvasData!== "object"){
                            betaCanvasData = JSON.parse(betaCanvasData);
                        }
                        betaCanvasObj = betaCanvasData;
                        if(betaCanvasData.otherContent && betaCanvasData.otherContent[0]){
                             betaAnnoList = betaCanvasData.otherContent[0]["@id"];
                        }
                        else{
                            betaAnnoList = "";
                        }
                        if(betaCanvasData.label !== undefined && betaCanvasData.label !== ""){
                          betaLabel = betaCanvasData.label;
                        }
                        if(betaCanvasData.images && betaCanvasData.images.length > 0){
                            if(betaCanvasData.images[0].resource["@id"].indexOf("imgNotFound") > -1){
                                
                            }
                            else if (betaCanvasData.images[0].resource["@id"] === ""){
                                
                            }
                            else{
                                betaImage = betaCanvasData.images[0].resource["@id"];
                            }
                        }
                        $.ajax({
                            "url":betaAnnoList,
                            success: function(annoList2){
                                if(typeof annoList2 !== "object"){
                                    annoList2 = JSON.parse(annoList2);
                                }
                                var tmpResources = annoList2.resources;
                               
                                if(typeof tmpResources !== "object"){
                                    tmpResources = tmpResources.replace('\"', '"');
                                    tmpResources = JSON.parse(tmpResources);
                                }
                                annoList2.resources = tmpResources;
                                annoListCollection[1] = annoList2;
                            }
                        });//live
                        $("#folioSide2").attr("onclick","enterCatalogueInfo('"+betaCanvasURI+"', 'verso');"); 
                        $("#folioSide2").attr("canvas", betaCanvasURI); 
                        if(betaImage.indexOf("addImg") > -1 || betaImage.indexOf("imgNotFound") > -1){
                            $("#oneAndtwo").find(".versoImg").attr("src","http://localhost:8080/brokenBooks/images/imgNotFound.png");
                            $("#leafTmp").find(".versoImg").attr("src","http://localhost:8080/brokenBooks/images/imgNotFound.png");
                            $("#folioSide1").find(".versoImg").attr("src","http://localhost:8080/brokenBooks/images/addImg.jpg");
                        }
                        else{
                            $(".versoImg").attr("src", betaImage);
                        }
                        $("#folio2Label").val(betaLabel);
                        $("#saveCover").hide();
                        $("#saveText").html("Saving...");
                    }
                    }); //live
                }
//                console.log("here are the anno lists");
//                console.log(annotationLists);
//                console.log(alphaAnnoList);
//                console.log(betaAnnoList);
                if(windowURL.indexOf("demo=1") > -1){
                    //error from demo when clicking blue i
                    $.each(annotationLists, function(){
                      if(this["@id"]!==undefined && this["@id"] === alphaAnnoList){
                        annoListCollection[0] = this;
                      }
                    });
                    $.each(annotationLists, function(){
                      if(this["@id"]!==undefined&&this["@id"] === betaAnnoList){
                        annoListCollection[1] = this;
                      }
                    });

                     $.each(annotationLists, function(){
                      if(this["@id"]!==undefined&&this["@id"] === leafAnnoList){
                        annoListCollection[2] = this;
                      }
                    });
                }

            }
        });
        
    }

    $(".leafPopover").show();
    var buttonToClose = $("<div onclick='closeLeafPopover();' class='leafPopClose'></div>");
    var arrangeAreaCover = $("<div class='arrangeAreaCover'></div>");
    $(".imgAdditionArea").show();
    if($(".imgAdditionArea").children(".leafPopClose").length == 0){
      $(".imgAdditionArea").append(buttonToClose);
    }
    //If admins can see this area, then the following doesn't have to be hidden.
    $("#placement").children("input[type='button']").hide();
   
    $("#placement").children("p:first").html("This area shows where the leaf is positioned in the structure.  This cannot be altered here.  If you want to move your leaf to a new section \n\
      close this and use the drag and drop interface.");

    submitIntro('testEdit');
    alpha = true;
    beta = false;
    zeta = false;
    //$(".popoverTrail").find(".selectedSection:first").click(); //collapse the tree
    selectInTree(leafIsIn); 
    //console.log("Click folio side 1, hide saveCover, change saveText");
    
    //$("#folioSide1").addClass("selectedSection");
    if(windowURL.indexOf("demo=1")>-1){
        //console.log("demo, populate anno forms with annos:");
        //console.log(annoListCollection);
        $("#folioSide1").addClass("selectedSection");
        populateAnnoForms();
        $("#saveCover").hide();
        $("#saveText").html("Updating...");
    }
    
    $(".popoverTrail").children(".rangeArrangementArea").append(arrangeAreaCover);

}

function selectInTree(child){
    var depth = $(".popoverTrail").find(".rangeArrangementArea").length;
    var lastArrangeArea = $(".popoverTrail").find('.rangeArrangementArea[depth="'+depth+'"]');
  
    var childToFindParents = lastArrangeArea.find(".arrangeSection[rangeID='"+child+"']");
    var theParent = childToFindParents.parent();
    var control = true;
    if(childToFindParents.length === 0 || childToFindParents.attr("class").indexOf("unassigned") > -1){
        return false;
    }
    if(theParent.attr("class").indexOf("notBucket") > -1 || theParent.attr("class").indexOf('unassigned') > -1 ){
        childToFindParents.click();
        selectInTree(child);
        // childToFindParents.addClass('selectedSection');
        // toggleChildren(childToFindParents, "recurse");
    }
    else{
        while(control == true){
            if(theParent.attr("class").indexOf("notBucket") > -1 || theParent.attr("class").indexOf('unassigned') > -1 ){
                control = false;
            }
            else{
                if(theParent.parent().attr("class") == "notBucket" || theParent.parent().attr("class").indexOf('unassigned') > -1 ){
                    //do nothing
                    control = false;
                }
                else{
                    theParent = theParent.parent();
                }
            }
        }
        recurseID = child;
        theParent.click();
        selectInTree(child);
        // theParent.addClass('selectedSection');
        // toggleChildren(theParent, "recurse");
    }
}

//Leaf locking happens in two directions.  If you lock a leaf to the leaf below, you have to update both leaves of the relationsip.  
function lock(leafURI, direction, event){
    
    var forProject = detectWho();
    var windowURL = document.location.href;
   // var getURL = "http://localhost:8080/brokenBooks/getAnnotationByPropertiesServlet";
    var updateAnnoURL = "http://localhost:8080/brokenBooks/updateRange";
    if($("div[depth='1']").find(".unassigned").attr("class").indexOf("selectedSection") > -1){
        //cannot lock leaves in the bucket
        alert("cannot lock leaves in the bucket.  Assign to a section first.");
        return false;
    }
    var area = $(event.target).closest(".rangeArrangementArea");
    var leafToLock = $(event.target).parent();
    var leafToLockWith = "";
    var newRange = "";
    if(direction === "up"){
        console.log("lock case: UP ");
        if(leafToLock.parent().attr("isOrdered")==="true"){
            leafToLockWith = leafToLock.parent().prev();
        }
        else{
            if(leafToLock.prev().attr("isOrdered") === "true"){
                leafToLockWith = leafToLock.prev().children(".arrangeSection:last");
            }
            else{
                leafToLockWith = leafToLock.prev();
            }
            
        }
        if(leafToLockWith.attr("class").indexOf("ordered") > -1){
            leafToLockWith = leafToLockWith.children(".arrangeSection:last");
        }
        if(leafToLockWith!== undefined && leafToLockWith.attr("class")!==undefined 
        && leafToLockWith.attr("class").indexOf("arrangeSection")>-1 && leafToLockWith.attr("leaf") === "true"){
            leafToLock.attr("draggable", "false");
            leafToLockWith.attr("draggable", "false");
            //update leaf being locked to know it is locked up.  This helps tremendously with the UI.
            var lockparamobj = {"@id":leafToLock.attr("rangeid"), "lockedup":"true"};
            var lockparams = {"content":JSON.stringify(lockparamobj)};
            $.each(rangeCollection, function(){
                if(this["@id"] === leafToLock.attr("rangeid")){
                    this.lockedup = "true";
                }
            });
            if(windowURL.indexOf("demo=1") === -1){
                //updateInManifest("structures", lockparamobj);
                $.post(updateAnnoURL, lockparams, function(){

                });
            }
            //update leaf being locked with to know it is locked down.  This helps tremendously with the UI.
            var lockparamobj3 = {"@id":leafToLockWith.attr("rangeid"), "lockeddown":"true"};
            var lockparams3 = {"content":JSON.stringify(lockparamobj3)};
            $.each(rangeCollection, function(){
                if(this["@id"] === leafToLockWith.attr("rangeid")){
                    this.lockeddown = "true";
                }
            });
            if(windowURL.indexOf("demo=1") === -1){
                //updateInManifest("structures", lockparamobj3);
                $.post(updateAnnoURL, lockparams3, function(){

                });
            }
            
            if(leafToLockWith.parent().attr("isOrdered") === "true"){
                    console.log("is ordered. we need to either combine both ordered ranges into one and delete the other or put this leaf into already existing list.");
                    if(leafToLock.parent().attr("isOrdered") === "true"){
                        //console.log("we must combine lists and delete one");
                        var idList1 = leafToLock.parent().attr("rangeid");
                        var idList2 = leafToLockWith.parent().attr("rangeid");
                        var domList1 = leafToLock.parent();
                        var domList2 = leafToLockWith.parent();  
                        var childrenToMove = domList1.children();
//                        var paramObj = {"@id":idList2};
//                        var params = {"content":JSON.stringify(paramObj)};
                        $.each(rangeCollection, function(){
                            if(this["@id"] === idList2){
                                var range = this;
                                var rangeList = range.ranges;
                                //console.log(rangeList);
                                $.each(childrenToMove, function(){
                                    console.log("append "+$(this).attr("rangeid")+" into list");
                                    rangeList.push($(this).attr("rangeid"));
                                });
                                //console.log("result");
                                //console.log(rangeList);
                                var paramObj2 = {"@id":idList2, "ranges":rangeList};
                                var params2 = {"content":JSON.stringify(paramObj2)};
                                this.ranges = rangeList;
                                if(windowURL.indexOf("demo=1") > -1){
                                    $.each(rangeCollection, function(){
                                            if(this["@id"] === area.attr("rangeid")){
                                                //console.log("Delete other list, remove its URI from the area range list");
                                                var range2 = this;
                                                var rangeList2 = range2.ranges;
                                                var index = $.inArray(idList1, rangeList2);
                                                //console.log("before removal of "+idList1);
                                                //console.log(rangeList2);
                                                rangeList2.splice(index,1);
                                                //console.log("after");
                                                //console.log(rangeList2);
                                                this.ranges = rangeList2;
                                                //console.log(idList1+" no longer in any lists, delete it");
                                                var index = 0;
                                                $.each(rangeCollection, function(){
                                                    index+=1;
                                                    if(this["@id"] === idList1){
                                                        rangeCollection.splice(index,1);
                                                        domList1.remove();
                                                    }
                                                });
                                            }
                                        });
                                }
                                else{
                                    //updateInManifest("structures", paramObj2);
                                    $.post(updateAnnoURL, params2, function(){
                                        //console.log("lists are merged");
                                        domList2.append(childrenToMove);
                                        $.each(rangeCollection, function(){
                                            if(this["@id"] === area.attr("rangeid")){
                                                //console.log("Delete other list, remove its URI from the area range list");
                                                var range2 = this;
                                                var rangeList2 = range2.ranges;
                                                var index = $.inArray(idList1, rangeList2);
                                                //console.log("before removal of "+idList1);
                                                //console.log(rangeList2);
                                                rangeList2.splice(index,1);
                                                //console.log("after");
                                                //console.log(rangeList2);
                                                var paramObj5 = {"@id":area.attr("rangeid"),"ranges":rangeList2};
                                                var params5 = {"content":JSON.stringify(paramObj5)};
                                                this.ranges = rangeList2;
                                                //updateInManifest("structures", paramObj5);
                                                $.post(updateAnnoURL, params5, function(){
                                                    //console.log(idList1+" no longer in any lists, delete it");
                                                    var removeURL = "http://localhost:8080/brokenBooks/deleteAnnotationByAtIDServlet";
                                                    var paramObj3 = {"@id":idList1};
                                                    var params3 = {"content":JSON.stringify(paramObj3)};
                                                    var index = 0;
                                                    $.each(rangeCollection, function(){
                                                        index+=1;
                                                        if(this["@id"] === idList1){
                                                            rangeCollection.splice(index,1);
                                                            //updateManifestStructures();
                                                            return false;
                                                        }
                                                    });
                                                    
                                                    $.post(removeURL, params3, function(){
                                                        //console.log("deleted");
                                                        domList1.remove();
                                                    });
                                                });
                                            }
                                        });
                                    });
                                }
                            }
                        });
                       
                    }
                    else{
                        console.log("We must add leaftolock to the end of leaftolockwith b/c leaf to lock is not in a group.");
                        var existingRangeDOM = leafToLockWith.parent();
                        existingRangeDOM.append(leafToLock);
                        var rangeListToRemoveFrom = area.attr("rangeid");
                        var rangeListToSpliceInto = existingRangeDOM.attr("rangeid");
                        $.each(rangeCollection, function(){
                            if(this["@id"] === rangeListToRemoveFrom){
                                var range = this;
                                var rangeList = range.ranges;
                                var index = $.inArray(leafToLock.attr("rangeid"),rangeList);
                                //console.log("remove "+leafToLock.attr("rangeid")+" from area:");
                                //console.log(rangeList);
                                rangeList.splice(index,1);
                                //console.log("result");
                                //console.log(rangeList);
                                var paramObj2 = {"@id":rangeListToRemoveFrom, "ranges":rangeList};
                                var params2 = {"content":JSON.stringify(paramObj2)};
                                this.ranges = rangeList;
                                if(windowURL.indexOf("demo=1") > -1){
                                    $.each(rangeCollection, function(){
                                        if(this["@id"] === rangeListToSpliceInto){
                                            var range2 = this;
                                            var rangeList2 = range2.ranges;
                                            //console.log("append "+leafToLock.attr("rangeid")+" to:");
                                            //console.log(rangeList2);
                                            rangeList2.push(leafToLock.attr("rangeid"));
                                            //console.log("result");
                                            //console.log(rangeList2);
                                            this.ranges = rangeList2;
                                        }
                                    });
                                }
                                else{
                                    //updateInManifest("structures", paramObj2);
                                    $.post(updateAnnoURL, params2, function(){
                                        $.each(rangeCollection, function(){
                                            if(this["@id"] === rangeListToSpliceInto){
                                                var range2 = this;
                                                var rangeList2 = range2.ranges;
                                                //console.log("append "+leafToLock.attr("rangeid")+" to:");
                                                //console.log(rangeList2);
                                                rangeList2.push(leafToLock.attr("rangeid"));
                                                //console.log("result");
                                                //console.log(rangeList2);
                                                var paramObj4= {"@id":rangeListToSpliceInto, "ranges":rangeList2};
                                                var params4 = {"content":JSON.stringify(paramObj4)};
                                                this.ranges = rangeList2;
                                                //updateInManifest("structures", paramObj4);
                                                $.post(updateAnnoURL, params4, function(){

                                                });
                                            }
                                        });
                                    });
                                }
                                
                            }
                        });                    
                    }                  
            }
            else{
                console.log("Leaf to lock with is not in a group.  Prolly need to make a new one.");
                if(leafToLock.find(".lockedDown").length > 0){
                    //console.log("we need to include into the existing one");
                    var existingRangeDOM = leafToLock.parent();
                    existingRangeDOM.prepend(leafToLockWith);
                    var rangeListToRemoveFrom = area.attr("rangeid");
                    var rangeListToSpliceInto = existingRangeDOM.attr("rangeid");
                    $.each(rangeCollection, function(){
                        if(this["@id"] === rangeListToRemoveFrom){
                            var range = this;
                            var rangeList = range.ranges;
                            var index = $.inArray(leafToLockWith.attr("rangeid"),rangeList);
                            //console.log("remove "+leafToLockWith.attr("rangeid")+" from:");
                            //console.log(rangeList);
                            rangeList.splice(index,1);
                            //console.log("result");
                            //console.log(rangeList);
                            var paramObj2 = {"@id":rangeListToRemoveFrom, "ranges":rangeList};
                            var params2 = {"content":JSON.stringify(paramObj2)};
                            this.ranges = rangeList;
                            if(windowURL.indexOf("demo=1") > -1){
                                $.each(rangeCollection, function(){
                                    if(this["@id"] === rangeListToSpliceInto){
                                        var range2 = this;
                                        var rangeList2 = range2.ranges;
                                        //console.log("prepend "+leafToLockWith.attr("rangeid")+" to:");
                                        //console.log(rangeList2);
                                        rangeList2.unshift(leafToLockWith.attr("rangeid"));
                                        //console.log("result");
                                        //console.log(rangeList2);
                                        this.ranges = rangeList2;
                                    }
                                });
                            }
                            else{
                                //updateInManifest("structures", paramObj2);
                                $.post(updateAnnoURL, params2, function(){
                                    $.each(rangeCollection, function(){
                                        if(this["@id"] === rangeListToSpliceInto){
                                            var range2 = this;
                                            var rangeList2 = range2.ranges;
                                            //console.log("prepend "+leafToLockWith.attr("rangeid")+" to:");
                                            //console.log(rangeList2);
                                            rangeList2.unshift(leafToLockWith.attr("rangeid"));
                                            //console.log("result");
                                            //console.log(rangeList2);
                                            var paramObj4= {"@id":rangeListToSpliceInto, "ranges":rangeList2};
                                            var params4 = {"content":JSON.stringify(paramObj4)};
                                            this.ranges = rangeList2;
                                            //updateInManifest("structures", paramObj4);
                                            $.post(updateAnnoURL, params4, function(){

                                            });
                                        }
                                    });
                                });
                            }
                        }
                    });
                }
                else{
                    //console.log("we need to make a new one");
                    rangeID = parseInt(rangeID) + 1;
                    var orderedRangeObject = {
	            	"@id" : "http://www.example.org/iiif/LlangBrev/range"+rangeID,
                        "@type":"sc:Range",
                        "label":"Locked Leaves" ,
                        "canvases" : [
                        ],
                        "resources" : [],
                        "ranges" : [leafToLockWith.attr("rangeid"), leafToLock.attr("rangeid")],
                        "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
                        "forProject": forProject,
                        "within" : area.attr("rangeid"),
                        "otherContent" : [],
                        "lockedup" : "",
                        "lockeddown": "",
                        "isReferencedBy":manifestID,
                        "isOrdered" : "true"
        		};
                    if(windowURL.indexOf("demo=1") > -1){
                        //console.log("saved, now wrap the newly locked leaves in a range in the UI");
                        rangeCollection.push(orderedRangeObject);
                        var rangeToInclude = orderedRangeObject["@id"];
                        var copy1 = leafToLock.clone();
                        var copy2 = leafToLockWith.clone();
                        var getID =  area.attr("rangeid");
                        var uniqueID2 = ($(".arrangeSection").length * 10) + 2;
                        var dragAttribute = "id='drag_"+uniqueID2+"' draggable='true' ondragstart='dragHelp(event);' ondragend='dragEnd(event);'";
                        newRange = $("<div class='arrangeSection ordered child' draggable='true' "+dragAttribute+" isOrdered='true' rangeID='"+rangeToInclude+"'></div>");
                        newRange.append(copy2);
                        newRange.append(copy1);
                        leafToLockWith.before(newRange);
                       
                        //console.log("update the ranges 1 field of "+getID);
                        $.each(rangeCollection, function(){
                            if(this["@id"] === getID){
                                var theobj = this;
                                var currentRanges2 = theobj.ranges;
                                //console.log("current ranges");
                                //console.log(currentRanges2);
                                var index = $.inArray(leafToLockWith.attr('rangeid'), currentRanges2);
                                currentRanges2.splice(index,0,rangeToInclude);
                                currentRanges2.splice( $.inArray(leafToLock.attr("rangeid"), currentRanges2), 1 );
                                currentRanges2.splice( $.inArray(leafToLockWith.attr("rangeid"), currentRanges2), 1);
                                //console.log("new current ranges 2");
                                //console.log(currentRanges2);
                                this.ranges = currentRanges2;
                                leafToLock.remove();
                                leafToLockWith.remove();
                            }
                            
                        });
                    }
                    else{
                        var newURL = "http://localhost:8080/brokenBooks/saveNewRange";
                        var params = {"content":JSON.stringify(orderedRangeObject)};
                       // console.log("save it....");
                        $.post(newURL, params, function(data){
                            //console.log("saved, now wrap the newly locked leaves in a range in the UI");
                            var rangeForUpdate = JSON.parse(data);
                            rangeCollection.push(rangeForUpdate);
                            //manifest.structures.push(rangeForUpdate);
                            var rangeToInclude = rangeForUpdate["@id"];
                            var copy1 = leafToLock.clone();
                            var copy2 = leafToLockWith.clone();
                            var getID =  area.attr("rangeid");
                            var uniqueID = ($(".arrangeSection").length * 10) + 1;
                            var dragAttribute = "id='drag_"+uniqueID+"' draggable='true' ondragstart='dragHelp(event);' ondragend='dragEnd(event);'";
                            newRange = $("<div class='arrangeSection ordered child' draggable='true' "+dragAttribute+" isOrdered='true' rangeID='"+rangeToInclude+"'></div>");
                            newRange.append(copy2);
                            newRange.append(copy1);
                            leafToLockWith.before(newRange);

                            //console.log("update the ranges 1 field of "+getID);
                            $.each(rangeCollection, function(){
                                var theobj = this;
                                var currentRanges2 = theobj.ranges;
                                //console.log("current ranges");
                                //console.log(currentRanges2);
                                var index = $.inArray(leafToLockWith.attr('rangeid'), currentRanges2);
                                currentRanges2.splice(index,0,rangeToInclude);
                                currentRanges2.splice( $.inArray(leafToLock.attr("rangeid"), currentRanges2), 1 );
                                currentRanges2.splice( $.inArray(leafToLockWith.attr("rangeid"), currentRanges2), 1);
                                //console.log("new current ranges 2");
                                //console.log(currentRanges2);
                                var rangeparamsobj = {"@id":getID,"ranges":currentRanges2};
                                var rangeparams = {"content":JSON.stringify(rangeparamsobj)};
                                this.ranges = currentRanges2;
                                //updateInManifest("structures", rangeparamsobj);
                                $.post(updateAnnoURL, rangeparams, function(){
                                    leafToLock.remove();
                                    leafToLockWith.remove();
                                });
                            });
                        });
                    }
                    
                }
                
            }           
            //paginate lock icons and their onclick functions
            //console.log("paginate locks");
            //console.log(area);
            area.find(".arrangeSection[rangeid='"+leafURI+"']").find(".lockUp").attr("class","lockedUp").attr("onclick","unlock('"+leafURI+"','up',event);");
            area.find(".arrangeSection[rangeid='"+leafToLockWith.attr('rangeid')+"']")
            .find(".lockDown").attr("class","lockedDown").attr("onclick","unlock('"+leafToLockWith.attr('rangeid')+"','down',event);");
        }
        else{
            alert("cannot lock this way. Error 1");
        }
    }
    //direction is down from here on
    else{
        if(leafToLock.parent().attr("isOrdered")==="true"){
            leafToLockWith = leafToLock.parent().next();
            //console.log("account for wrapper when getting leaf to lock with");
            //console.log(leafToLockWith);
        }
        else{
            if(leafToLock.next().attr("isOrdered") === "true"){
                leafToLockWith = leafToLock.next().children(".arrangeSection:first");
            }
            else{
                leafToLockWith = leafToLock.next();
            }
        }
        if(leafToLockWith.attr("class").indexOf("ordered") > -1){
            leafToLockWith = leafToLockWith.children(".arrangeSection:first");
        }
        if(leafToLockWith!== undefined && leafToLockWith.attr("class")!==undefined 
        && leafToLockWith.attr("class").indexOf("arrangeSection")>-1 && leafToLockWith.attr("leaf") === "true"){
            leafToLock.attr("draggable", "false");
            leafToLockWith.attr("draggable", "false");
            //update leaf being locked to know it is locked up.  This helps tremendously with the UI.
            var lockparamobj = {"@id":leafToLock.attr("rangeid"), "lockeddown":"true"};
            var lockparams = {"content":JSON.stringify(lockparamobj)};
            $.each(rangeCollection, function(){
                if(this["@id"] === leafToLock.attr("rangeid")){
                    this.lockeddown = "true";
                }
            });
            if(windowURL.indexOf("demo=1") > -1){
               $.post(updateAnnoURL, lockparams, function(){

                }); 
            }

            //update leaf being locked with to know it is locked down.  This helps tremendously with the UI.
            var lockparamobj3 = {"@id":leafToLockWith.attr("rangeid"), "lockedup":"true"};
            var lockparams3 = {"content":JSON.stringify(lockparamobj3)};
            $.each(rangeCollection, function(){
                if(this["@id"] === leafToLockWith.attr("rangeid")){
                    this.lockedup = "true";
                }
            });
            if(windowURL.indexOf("demo=1") > -1){
                $.post(updateAnnoURL, lockparams3, function(){

                });
            }
            
            if(leafToLockWith.parent().attr("isOrdered") === "true"){
                    //console.log("is ordered. we need to either combine both ordered ranges into one and delete the other or put this leaf into already existing list.");
                    if(leafToLock.parent().attr("isOrdered") === "true"){
                        //console.log("we must combine lists and delete one");
                        var idList2 = leafToLock.parent().attr("rangeid");
                        var idList1 = leafToLockWith.parent().attr("rangeid");
                        var domList2 = leafToLock.parent();
                        var domList1 = leafToLockWith.parent();  
                        var childrenToMove = domList1.children();
                        $.each(rangeCollection, function(){
                            if(this["@id"] === idList2){
                                //console.log("got range list of "+idList2+" to append into");
                                var range = this;
                                var rangeList = range.ranges;
                                //console.log(rangeList);
                                $.each(childrenToMove, function(){
                                    //console.log("append "+$(this).attr("rangeid")+" into list");
                                    rangeList.push($(this).attr("rangeid"));
                                });
                                //console.log("result");
                                //console.log(rangeList);
                                var paramObj2 = {"@id":idList2, "ranges":rangeList};
                                var params2 = {"content":JSON.stringify(paramObj2)};
                                if(windowURL.indexOf("demo-1") > -1){
                                    $.each(rangeCollection, function(){
                                        if(this["@id"] === idList2){
                                            this.ranges = rangeList;
                                            //console.log("lists are merged");
                                            domList2.append(childrenToMove);
                                            $.each(rangeCollection, function(){
                                                if(this["@id"] === area.attr("rangeid")){
                                                    //console.log("Delete other list, remove its URI from the area range list");
                                                    var range2 = this;
                                                    var rangeList2 = range2.ranges;
                                                    var index = $.inArray(idList1, rangeList2);
                                                    //console.log("before removal of "+idList1);
                                                    //console.log(rangeList2);
                                                    rangeList2.splice(index,1);
                                                    //console.log("after");
                                                    //console.log(rangeList2);
                                                    this.ranges = rangeList2;
                                                    //console.log(idList1+" no longer in any lists, delete it");
                                                    var index2 = 0;
                                                    $.each(rangeCollection, function(){
                                                        index2+=1;
                                                        if(this["@id"] === idList1){
                                                            rangeCollection.splice(index2, 1);
                                                            domList1.remove();
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                                else{
                                    //updateInManifest("structures", paramObj2);
                                    $.post(updateAnnoURL, params2, function(){
                                        //console.log("lists are merged");
                                        domList2.append(childrenToMove);
                                        $.each(rangeCollection, function(){
                                            if(this["@id"] === area.attr("rangeid")){
                                                //console.log("Delete other list, remove its URI from the area range list");
                                                var range2 = this;
                                                var rangeList2 = range2.ranges;
                                                var index = $.inArray(idList1, rangeList2);
//                                                console.log("before removal of "+idList1);
//                                                console.log(rangeList2);
                                                rangeList2.splice(index,1);
//                                                console.log("after");
//                                                console.log(rangeList2);
                                                var paramObj5 = {"@id":area.attr("rangeid"),"ranges":rangeList2};
                                                var params5 = {"content":JSON.stringify(paramObj5)};
                                                this.ranges = rangeList2;
                                                //updateInManifest("structures", paramObj5);
                                                $.post(updateAnnoURL, params5, function(){
                                                    //console.log(idList1+" no longer in any lists, delete it");
                                                    var removeURL = "http://localhost:8080/brokenBooks/deleteAnnotationByAtIDServlet";
                                                    var paramObj3 = {"@id":idList1};
                                                    var params3 = {"content":JSON.stringify(paramObj3)};
                                                    //console.log(idList1+" no longer in any lists, delete it");
                                                    var index2 = 0;
                                                    $.each(rangeCollection, function(){
                                                        index2+=1;
                                                        if(this["@id"] === idList1){
                                                            rangeCollection.splice(index2, 1);
                                                            //updateManifestStructures();
                                                        }
                                                    });
                                                    $.post(removeURL, params3, function(){
                                                        //console.log("deleted");
                                                        domList1.remove();
                                                    });
                                                });
                                            }
                                        });
                                    });
                                }
                                
                            }
                        });  
                    }
                    else{
                        //console.log("We must add leaftolock to the beginning of leaftolockwith.parent()");
                        var existingRangeDOM = leafToLockWith.parent();
                        existingRangeDOM.prepend(leafToLock);
                        var rangeListToRemoveFrom = area.attr("rangeid");
                        var rangeListToSpliceInto = existingRangeDOM.attr("rangeid");
                        $.each(rangeCollection, function(){
                            if(this["@id"] === rangeListToRemoveFrom){
                                var range = this;
                                var rangeList = range.ranges;
                                var index = $.inArray(leafToLock.attr("rangeid"),rangeList);
//                                console.log("remove "+leafToLock.attr("rangeid")+" from:");
//                                console.log(rangeList);
                                rangeList.splice(index,1);
//                                console.log("result");
//                                console.log(rangeList);
                                var paramObj2 = {"@id":rangeListToRemoveFrom, "ranges":rangeList};
                                var params2 = {"content":JSON.stringify(paramObj2)};
                                if(windowURL.indexOf("demo=1") > -1){
                                    this.ranges = rangeList;
                                    $.each(rangeCollection, function(){
                                            if(this["@id"] === rangeListToSpliceInto){
                                                var range2 = this;
                                                var rangeList2 = range2.ranges;
//                                                console.log("prepend "+leafToLock.attr("rangeid")+" to:");
//                                                console.log(rangeList2);
                                                rangeList2.unshift(leafToLock.attr("rangeid"));
//                                                console.log("result");
//                                                console.log(rangeList2);
                                                this.ranges = rangeList2;
                                            }
                                        });
                                }
                                else{
                                    //updateInManifest("structures", paramObj2);
                                    $.post(updateAnnoURL, params2, function(){
                                        $.each(rangeCollection, function(){
                                            if(this["@id"] === rangeListToSpliceInto){
                                                var range2 = this;
                                                var rangeList2 = range2.ranges;
//                                                console.log("prepend "+leafToLock.attr("rangeid")+" to:");
//                                                console.log(rangeList2);
                                                rangeList2.unshift(leafToLock.attr("rangeid"));
//                                                console.log("result");
//                                                console.log(rangeList2);
                                                var paramObj4= {"@id":rangeListToSpliceInto, "ranges":rangeList2};
                                                var params4 = {"content":JSON.stringify(paramObj4)};
                                                this.ranges = rangeList2;
                                                //updateInManifest("structures", paramObj4);
                                                $.post(updateAnnoURL, params4, function(){

                                                });
                                            }
                                        });

                                    });
                                }
                                
                            }
                        });
                        
//                        var paramObj = {"@id":rangeListToRemoveFrom};
//                        var params = {"content":JSON.stringify(paramObj)};
//                        $.post(getURL, params, function(data){
//                            var rangedata = JSON.parse(data);
//                            var range = rangedata[0];
//                            var rangeList = range.ranges;
//                            var index = $.inArray(leafToLock.attr("rangeid"),rangeList);
//                            console.log("remove "+leafToLock.attr("rangeid")+" from:");
//                            console.log(rangeList);
//                            rangeList.splice(index,1);
//                            console.log("result");
//                            console.log(rangeList);
//                            var paramObj2 = {"@id":rangeListToRemoveFrom, "ranges":rangeList};
//                            var params2 = {"content":JSON.stringify(paramObj2)};
//                            $.post(updateAnnoURL, params2, function(){
//                                var paramObj3 = {"@id":rangeListToSpliceInto};
//                                var params3= {"content":JSON.stringify(paramObj3)};
//                                $.post(getURL, params3, function(data2){
//                                    var rangedata2 = JSON.parse(data2);
//                                    var range2 = rangedata2[0];
//                                    var rangeList2 = range2.ranges;
//                                    console.log("prepend "+leafToLock.attr("rangeid")+" to:");
//                                    console.log(rangeList2);
//                                    rangeList2.unshift(leafToLock.attr("rangeid"));
//                                    console.log("result");
//                                    console.log(rangeList2);
//                                    var paramObj4= {"@id":rangeListToSpliceInto, "ranges":rangeList2};
//                                    var params4 = {"content":JSON.stringify(paramObj4)};
//                                    $.post(updateAnnoURL, params4, function(){
//
//                                    });
//                                });
//                            });
//
//                        });
                        
                    }
            }
            else{
                //console.log("It is not ordered, we either need to make a new ordered range or include into the existing one");
                if(leafToLock.find(".lockedUp").length > 0){
                    //console.log("we need to include into the existing one");
                    var existingRangeDOM = leafToLock.parent();
                    existingRangeDOM.append(leafToLockWith);
                    var rangeListToRemoveFrom = area.attr("rangeid");
                    var rangeListToSpliceInto = existingRangeDOM.attr("rangeid");
                    $.each(rangeCollection, function(){
                        if(this["@id"] === rangeListToRemoveFrom){
                            var range = this;
                            var rangeList = range.ranges;
                            var index = $.inArray(leafToLockWith.attr("rangeid"),rangeList);
//                            console.log("remove "+leafToLockWith.attr("rangeid")+" from:");
//                            console.log(rangeList);
                            rangeList.splice(index,1);
//                            console.log("result");
//                            console.log(rangeList);
                            var paramObj2 = {"@id":rangeListToRemoveFrom, "ranges":rangeList};
                            var params2 = {"content":JSON.stringify(paramObj2)};
                            this.ranges = rangeList;
                            if(windowURL.indexOf("demo=1") > -1){
                                $.each(rangeCollection, function(){
                                    if(this["@id"] === rangeListToSpliceInto){
                                        var rangedata2 = this;
                                        var range2 = rangedata2[0];
                                        var rangeList2 = range2.ranges;
//                                        console.log("append "+leafToLockWith.attr("rangeid")+" to:");
//                                        console.log(rangeList2);
                                        rangeList2.push(leafToLockWith.attr("rangeid"));
//                                        console.log("result");
//                                        console.log(rangeList2);
                                        this.ranges = rangeList2;
                                    }
                                });
                            }
                            else{
                                //updateInManifest("structures", paramObj2);
                                $.post(updateAnnoURL, params2, function(){
                                    $.each(rangeCollection, function(){
                                        if(this["@id"] === rangeListToSpliceInto){
                                            var rangedata2 = this;
                                            var range2 = rangedata2[0];
                                            var rangeList2 = range2.ranges;
//                                            console.log("append "+leafToLockWith.attr("rangeid")+" to:");
//                                            console.log(rangeList2);
                                            rangeList2.push(leafToLockWith.attr("rangeid"));
//                                            console.log("result");
//                                            console.log(rangeList2);
                                            var paramObj4= {"@id":rangeListToSpliceInto, "ranges":rangeList2};
                                            var params4 = {"content":JSON.stringify(paramObj4)};
                                            this.ranges = rangeList2;
                                            //updateInManifest("structures", paramObj4);
                                            $.post(updateAnnoURL, params4, function(){

                                            });
                                        }
                                    });

                                });
                            }

                        }
                    });
                    
//                    var paramObj = {"@id":rangeListToRemoveFrom};
//                    var params = {"content":JSON.stringify(paramObj)};
//                    $.post(getURL, params, function(data){
//                        var rangedata = JSON.parse(data);
//                        var range = rangedata[0];
//                        var rangeList = range.ranges;
//                        var index = $.inArray(leafToLockWith.attr("rangeid"),rangeList);
//                        console.log("remove "+leafToLockWith.attr("rangeid")+" from:");
//                        console.log(rangeList);
//                        rangeList.splice(index,1);
//                        console.log("result");
//                        console.log(rangeList);
//                        var paramObj2 = {"@id":rangeListToRemoveFrom, "ranges":rangeList};
//                        var params2 = {"content":JSON.stringify(paramObj2)};
//                        $.post(updateAnnoURL, params2, function(){
//                            var paramObj3 = {"@id":rangeListToSpliceInto};
//                            var params3= {"content":JSON.stringify(paramObj3)};
//                            $.post(getURL, params3, function(data2){
//                                var rangedata2 = JSON.parse(data2);
//                                var range2 = rangedata2[0];
//                                var rangeList2 = range2.ranges;
//                                console.log("append "+leafToLockWith.attr("rangeid")+" to:");
//                                console.log(rangeList2);
//                                rangeList2.push(leafToLockWith.attr("rangeid"));
//                                console.log("result");
//                                console.log(rangeList2);
//                                var paramObj4= {"@id":rangeListToSpliceInto, "ranges":rangeList2};
//                                var params4 = {"content":JSON.stringify(paramObj4)};
//                                $.post(updateAnnoURL, params4, function(){
//                                    
//                                });
//                            });
//                        });
//                      
//                    });
                }
                else{
                    //console.log("we need to make a new one");
                    //var uniqueID = ($(".arrangeSection").length * 10) + 1;
                    rangeID = parseInt(rangeID) + 1;
                    //console.log(typeof rangeID);
                    //console.log("what is rangeID: "+rangeID);
                    var orderedRangeObject = {
	            	"@id" : "http://www.example.org/iiif/LlangBrev/range/"+rangeID,
                        "@type":"sc:Range",
                        "label":"Locked Leaves" ,
                        "canvases" : [
                        ],
                        "resources" : [],
                        "ranges" : [leafToLock.attr("rangeid"), leafToLockWith.attr("rangeid")],
                        "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
                        "forProject": forProject,
                        "within" : area.attr("rangeid"),
                        "otherContent" : [],
                        "lockedup" : "",
                        "lockeddown": "",
                        "isReferencedBy":manifestID,
                        "isOrdered" : "true"
        		};
                        
                    var newURL = "http://localhost:8080/brokenBooks/saveNewRange";
                    var params = {"content":JSON.stringify(orderedRangeObject)};
                    //console.log("save it....");
                    if(windowURL.indexOf("demo=1") > -1){
                        rangeCollection.push(orderedRangeObject);
                        var rangeToInclude = orderedRangeObject["@id"];
                        var copy1 = leafToLock.clone();
                        var copy2 = leafToLockWith.clone();
                        var getID =  area.attr("rangeid");
                        var uniqueID2 = ($(".arrangeSection").length * 10) + 2;
                        var dragAttribute = "id='drag_"+uniqueID2+"' draggable='true' ondragstart='dragHelp(event);' ondragend='dragEnd(event);'";
                        newRange = $("<div class='arrangeSection ordered child' draggable='true' "+dragAttribute+" isOrdered='true' rangeID='"+rangeToInclude+"'></div>");
                        newRange.append(copy1);
                        newRange.append(copy2);
                        leafToLock.before(newRange);
                        //console.log("update the ranges 2 field of "+getID);
                        $.each(rangeCollection, function(){
                            if(this["@id"] === getID){
                                var theobj = this;
                                var currentRanges2 = theobj.ranges;
//                                console.log("current ranges 2");
//                                console.log(currentRanges2);
                                var index = $.inArray(leafToLock.attr('rangeid'), currentRanges2);
                                currentRanges2.splice(index,0,rangeToInclude);
                                currentRanges2.splice( $.inArray(leafToLock.attr("rangeid"), currentRanges2), 1 );
                                currentRanges2.splice( $.inArray(leafToLockWith.attr("rangeid"), currentRanges2), 1 );
                                this.ranges = currentRanges2;
                                leafToLock.remove();
                                leafToLockWith.remove();
                            }
                            
                        });                        
                    }
                    else{
                        $.post(newURL, params, function(data){
                            //console.log("saved, now wrap the newly locked leaves in a range in the UI");
                            var rangeForUpdate = JSON.parse(data);
                            rangeCollection.push(rangeForUpdate);
                            //manifest.structures.push(rangeForUpdate);
                            var rangeToInclude = rangeForUpdate["@id"];
                            var copy1 = leafToLock.clone();
                            var copy2 = leafToLockWith.clone();
                            var getID =  area.attr("rangeid");
                            var uniqueID = ($(".arrangeSection").length * 10) + 1;
                            var dragAttribute = "id='drag_"+uniqueID+"' draggable='true' ondragstart='dragHelp(event);' ondragend='dragEnd(event);'";
                            newRange = $("<div class='arrangeSection ordered child' draggable='true' "+dragAttribute+" isOrdered='true' rangeID='"+rangeToInclude+"'></div>");
                            newRange.append(copy1);
                            newRange.append(copy2);
                            leafToLock.before(newRange);
                            console.log("update the ranges 2 field of "+getID);
                            $.each(rangeCollection, function(){
                                if(this["@id"] === getID){
                                    var theobj = this;
                                    var currentRanges2 = theobj.ranges;
//                                    console.log("current ranges 2");
//                                    console.log(currentRanges2);
                                    var index = $.inArray(leafToLock.attr('rangeid'), currentRanges2);
                                    currentRanges2.splice(index,0,rangeToInclude);
                                    currentRanges2.splice( $.inArray(leafToLock.attr("rangeid"), currentRanges2), 1 );
                                    currentRanges2.splice( $.inArray(leafToLockWith.attr("rangeid"), currentRanges2), 1 );
//                                    console.log("new current ranges 2");
//                                    console.log(currentRanges2);
                                    var rangeparamsobj2 = {"@id":getID, "ranges":currentRanges2};
                                    var rangeparams2 = {"content":JSON.stringify(rangeparamsobj2)};
                                    this.ranges = currentRanges2;
                                    //updateInManifest("structures",rangeparamsobj2);
                                    $.post(updateAnnoURL, rangeparams2, function(){
                                        leafToLock.remove();
                                        leafToLockWith.remove();
                                    });
                                }
                                
                            });

    //                        var paramObj12 = {"@id":getID};
    //                        var params12 = {"content":JSON.stringify(paramObj12)};
    //                        $.post(getURL, params12, function(data){
    //                            var obj = JSON.parse(data);
    //                            var theobj = obj[0];
    //                            var currentRanges2 = theobj.ranges;
    //                            console.log("current ranges 2");
    //                            console.log(currentRanges2);
    //                            var index = $.inArray(leafToLock.attr('rangeid'), currentRanges2);
    //                            currentRanges2.splice(index,0,rangeToInclude);
    //                            currentRanges2.splice( $.inArray(leafToLock.attr("rangeid"), currentRanges2), 1 );
    //                            currentRanges2.splice( $.inArray(leafToLockWith.attr("rangeid"), currentRanges2), 1 );
    //                            console.log("new current ranges 2");
    //                            console.log(currentRanges2);
    //                            var rangeparamsobj2 = {"@id":getID, "ranges":currentRanges2};
    //                            var rangeparams2 = {"content":JSON.stringify(rangeparamsobj2)};
    //                            $.post(updateAnnoURL, rangeparams2, function(){
    //                                leafToLock.remove();
    //                                leafToLockWith.remove();
    //                            });
    //                        });
                        });
                    }
                    
                }
                
            }
            //paginate lock icons and their onclick functions
            area.find(".arrangeSection[rangeid='"+leafURI+"']").find(".lockDown").attr("class","lockedDown").attr("onclick","unlock('"+leafURI+"','down',event);");
            area.find(".arrangeSection[rangeid='"+leafToLockWith.attr('rangeid')+"']")
            .find(".lockUp").attr("class","lockedUp").attr("onclick","unlock('"+leafToLockWith.attr('rangeid')+"','up',event);");
        }
        else{
            alert("cannot lock this way. Error 2");
        }
    }    
}

function unlock(leafURI, direction, event){
    var leafURIcpy = leafURI;
    var windowURL = document.location.href;
    var removeURL = "http://localhost:8080/brokenBooks/deleteAnnotationByAtIDServlet";
    var updateURL = "http://localhost:8080/brokenBooks/updateRange";
    var getURL = "http://localhost:8080/brokenBooks/getAnnotationByPropertiesServlet";
    var forProject = detectWho();
//    if(windowURL.indexOf("demo=1") > -1){
//        return false; 
//    }
    var area = $(event.target).closest(".rangeArrangementArea");
    var leafToLock = $(event.target).parent();
    var leafToLockWith = "";
    var numOrdered = leafToLock.parent().find(".arrangeSection").length;
    //console.log("Num ordered things in unlock: "+numOrdered);
    if(direction === "up"){
        leafToLockWith = leafToLock.prev();
        var ltlwID = leafToLockWith.attr("rangeid");
        if(leafToLockWith!== undefined && leafToLockWith.attr("class")!==undefined 
        && leafToLockWith.attr("class").indexOf("arrangeSection")>-1 && leafToLockWith.attr("leaf") === "true"){
            var lockparamobj = {"@id":leafToLock.attr("rangeid"), "lockedup":"false"};
            var lockparams = {"content":JSON.stringify(lockparamobj)};
            if(windowURL.indexOf("demo=1") > -1){
                $.each(rangeCollection, function(){
                    if(this["@id"] === leafToLock.attr("rangeid")){
                        this.lockedup = "false";
                    }
                });
            }
            else{
                $.each(rangeCollection, function(){
                    if(this["@id"] === leafToLock.attr("rangeid")){
                        this.lockedup = "false";
                    }
                });
                //updateInManifest("structures", lockparamobj);
                $.post(updateURL, lockparams, function(){

                });
            }
            var lockparamobj3 = {"@id":leafToLockWith.attr("rangeid"), "lockeddown":"false"};
            var lockparams3 = {"content":JSON.stringify(lockparamobj3)};
            if(windowURL.indexOf("demo=1") > -1){
                $.each(rangeCollection, function(){
                    if(this["@id"] === leafToLockWith.attr("rangeid")){
                        this.lockeddown = "false";
                    }
                });
            }
            else{
                $.each(rangeCollection, function(){
                    if(this["@id"] === leafToLockWith.attr("rangeid")){
                        this.lockeddown = "false";
                    }
                });
                //updateInManifest("structures", lockparamobj3);
                $.post(updateURL, lockparams3, function(){

                });
            }
            
            //update leaf being locked with to know it is locked down.  This helps tremendously with the UI.

            if(numOrdered > 2){
                //update leaf being locked to know it is locked up.  This helps tremendously with the UI.
                leafURI = leafToLock.parent().attr("rangeid");
                //var rangeBefore = leafToLock.parent().prev();
                var leafBefore = leafToLock.prev();
                //var paramObj = {"@id":leafURI};
                //var params = {"content":JSON.stringify(paramObj)};
                var newWithin = area.attr("rangeid");
                var copy1 = leafToLockWith.clone();
                $.each(rangeCollection, function(){
                    if(this["@id"] === leafURI){
                        var rangeObj = this;
                        var rangeList = rangeObj.ranges;
                        var rangesRemoved = [];
                        var rangeIDs = [];
//                        console.log("ranges before");
//                        console.log(rangeList);
                        while(leafBefore.attr("leaf")==="true"){
                            rangeList.splice( $.inArray(leafBefore.attr("rangeid"), rangeList), 1 );
                            rangesRemoved.unshift(leafBefore);
                            rangeIDs.unshift(leafBefore.attr("rangeid")); //preserve order with prepend
                            leafBefore = leafBefore.prev();
                        }
//                        console.log("ranges after");
//                        console.log(rangeList);
//                        console.log("update range list of range spliced out of.");
//
//                        console.log("ordered range ranges");
//                        console.log(rangeIDs);

                        var paramObj2 = {"@id":leafURI, "ranges": rangeList};
                        var params2 = {"content":JSON.stringify(paramObj2)};
                        this.ranges = rangeList;
                        if(windowURL.indexOf("demo=1") > -1){
                            //console.log("updated");
                            //var uniqueID = $(".arrangeSection").length*10 + 1;
                            rangeID = parseInt(rangeID) + 1;
//                            console.log(typeof rangeID);
//                            console.log("what is rangeID: "+rangeID);
                            if(rangesRemoved.length > 1){
                                var orderedRangeObject = {
                                    "@id" : "http://www.example.org/iiif/LlangBrev/range/"+rangeID,
                                    "@type":"sc:Range",
                                    "label":"Locked Leaves" ,
                                    "canvases" : [
                                    ],
                                    "resources" : [],
                                    "ranges" : rangeIDs,
                                    "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
                                    "forProject": forProject,
                                    "within" : area.attr("rangeid"),
                                    "otherContent" : [],
                                    "lockedup" : "",
                                    "lockeddown": "",
                                    "isReferencedBy":manifestID,
                                    "isOrdered" : "true"
                                };

                                    rangeCollection.push(orderedRangeObject);
                                    //console.log("saved range, update URI");
                                    var rangeToInclude = orderedrangeObject["@id"];
                                    var uniqueID2 = ($(".arrangeSection").length * 10) + 1;
                                    var dragAttribute = "id='drag_"+uniqueID2+"' draggable='true' ondragstart='dragHelp(event);' ondragend='dragEnd(event);'";
                                    var newRange = $("<div class='arrangeSection ordered child' draggable='true' "+dragAttribute+" isOrdered='true' rangeID='"+rangeToInclude+"'></div>");
//                                    console.log("go thru ranges removed2");
//                                    console.log(rangesRemoved);
                                    $.each(rangesRemoved, function(){
                                        var clone = $(this).clone();
                                        clone.attr("relation", rangeToInclude);
                                        $(this).remove();
                                        newRange.append(clone);
                                    });

                                    //Need to update area ranges field to include the new group.
                                    //console.log("update area ranges field");

                                    $.each(rangeCollection, function(){
                                        if(this["@id"] === newWithin){
                                            var range = this;
                                            var rangeList2 = range.ranges;
                                            rangeList2.unshift(rangeToInclude);
                                            this.ranges = rangeList2;

                                        }
                                    });
                                    //wait for while loop. causes a small blip of the locked leaves to appear and disappear, all good. 
                                    //DO not need withins for demo.
//                                    setTimeout(function(){
//                                        console.log("update withings");
//                                        leafToLock.before(newRange);
//                                        $.each(newRange.children(), function(){
//                                            console.log("update withins of children in new group");
//                                            var paramObj5 = {"@id":$(this).attr("rangeid"),"within":rangeToInclude};
//                                            var params5 = {"content":JSON.stringify(paramObj5)};
//                                            $.post(updateURL, params5);
//                                        });
//                                    },300);
                                
                            }
                            else{
                                //console.log("Otherwise, just pop out to parent");
                                $.each(rangeCollection, function(){
                                    if(this["@id"] === newWithin){
                                        var range = this;
                                        var rangeList2 = range.ranges;
                                        var index = $.inArray(leafToLockWith.parent().attr("rangeid"), rangeList2);
                                        rangeList2.splice(index,0,leafToLockWith.attr("rangeid"));
                                        leafToLockWith.remove();
                                        copy1.attr("draggable", "true").css("display", "block");
                                        leafToLock.parent().before(copy1);
                                        //console.log("update range recieving popped out child");
                                        this.ranges = rangeList2;
                                        //do not need withins for demo
//                                        console.log("update within of range popped");
//                                        var paramObj2 = {"@id":ltlwID, "within":newWithin};
//                                        var params2 = {"content":JSON.stringify(paramObj2)};
//                                        $.post(updateURL, params2, function(){
//                                            console.log("WITHIN 3 UPDATED");
//                                        });
                                    }
                                });
                            }
                        }
                        else{
                            //updateInManifest("structures", paramObj2);
                            $.post(updateURL, params2, function(){
                                //console.log("updated");
                                //var uniqueID = $(".arrangeSection").length*10 + 1;
                                rangeID = parseInt(rangeID) + 1;
//                                console.log(typeof rangeID);
//                                console.log("what is rangeID: "+rangeID);
//                                console.log("zxcvbn");
                                if(rangesRemoved.length > 1){
                                    var orderedRangeObject = {
                                        "@id" : "http://www.example.org/iiif/LlangBrev/range/"+rangeID,
                                        "@type":"sc:Range",
                                        "label":"Locked Leaves" ,
                                        "canvases" : [
                                        ],
                                        "resources" : [],
                                        "ranges" : rangeIDs,
                                        "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
                                        "forProject": forProject,
                                        "within" : area.attr("rangeid"),
                                        "otherContent" : [],
                                        "lockedup" : "",
                                        "lockeddown": "",
                                        "isReferencedBy":manifestID,
                                        "isOrdered" : "true"
                                    };

                                    var newURL = "http://localhost:8080/brokenBooks/saveNewRange";
                                    var params = {"content":JSON.stringify(orderedRangeObject)};
                                    $.post(newURL, params, function(data){
                                        //console.log("saved range, update URI");
                                        var rangeForUpdate = JSON.parse(data);
                                        rangeCollection.push(rangeForUpdate);
                                        var rangeToInclude = rangeForUpdate["@id"];
                                        var uniqueID2 = ($(".arrangeSection").length * 10) + 1;
                                        var dragAttribute = "id='drag_"+uniqueID2+"' draggable='true' ondragstart='dragHelp(event);' ondragend='dragEnd(event);'";
                                        var newRange = $("<div class='arrangeSection ordered child' draggable='true' "+dragAttribute+" isOrdered='true' rangeID='"+rangeToInclude+"'></div>");
//                                        console.log("go thru ranges removed2");
//                                        console.log(rangesRemoved);
                                        $.each(rangesRemoved, function(){
                                            var clone = $(this).clone();
                                            clone.attr("relation", rangeToInclude);
                                            $(this).remove();
                                            newRange.append(clone);
                                        });

                                        //Need to update area ranges field to include the new group.
                                        //console.log("update area ranges field");
                                        $.each(rangeCollection, function(){
                                            if(this["@id"] === newWithin){
                                                var range = this;
                                                var rangeList = range.ranges;
                                                rangeList.unshift(rangeToInclude);
                                                var paramObj32 = {"@id":newWithin, "ranges":rangeList};
                                                var params32 = {"content":JSON.stringify(paramObj32)};
                                                //updateInManifest("structures", paramObj32);
                                                $.post(updateURL, params32, function(){

                                                });
                                            }
                                        });

                                        //wait for while loop. causes a small blip of the locked leaves to appear and disappear, all good. 
                                        setTimeout(function(){
                                           // console.log("update withings");
                                            leafToLock.before(newRange);
                                            $.each(newRange.children(), function(){
                                                console.log("update withins of children in new group");
                                                var paramObj5 = {"@id":$(this).attr("rangeid"),"within":rangeToInclude};
                                                var params5 = {"content":JSON.stringify(paramObj5)};
                                                //updateInManifest("structures", paramObj5);
                                                $.post(updateURL, params5);
                                            });
                                        },300);
                                    });
                                }
                                else{
                                    //console.log("Otherwise, just pop out to parent");
                                    $.each(rangeCollection, function(){
                                        if(this["@id"] === newWithin){
                                            var range = this;
                                            var rangeList2 = range.ranges;
                                            var index = $.inArray(leafToLockWith.parent().attr("rangeid"), rangeList2);
                                            rangeList2.splice(index,0,leafToLockWith.attr("rangeid"));
                                            leafToLockWith.remove();
                                            copy1.attr("draggable", "true").css("display", "block");
                                            leafToLock.parent().before(copy1);
                                            //console.log("update range recieving popped out child");
                                            var paramObj6 = {"@id":newWithin, "ranges":rangeList2};
                                            var params6 = {"content":JSON.stringify(paramObj6)};
                                            this.ranges = rangeList2;
                                            //updateInManifest("structures", paramObj6);
                                            $.post(updateURL, params6, function(){

                                            });
                                            //console.log("update within of range popped");
                                            var paramObj2 = {"@id":ltlwID, "within":newWithin};
                                            var params2 = {"content":JSON.stringify(paramObj2)};
                                            //updateInManifest("structures", paramObj2);
                                            $.post(updateURL, params2, function(){
                                                //console.log("WITHIN 3 UPDATED");
                                            });
                                        }
                                    });
                                }

                            });
                        }
                        
                        
                    }
                });
                
                
//                $.post(getURL, params, function(data){
//                    var rangeObj = JSON.parse(data)[0];
//                    var rangeList = rangeObj.ranges;
//                    var rangesRemoved = [];
//                    var rangeIDs = [];
//                    console.log("ranges before");
//                    console.log(rangeList);
//                    while(leafBefore.attr("leaf")==="true"){
//                        rangeList.splice( $.inArray(leafBefore.attr("rangeid"), rangeList), 1 );
//                        rangesRemoved.unshift(leafBefore);
//                        rangeIDs.unshift(leafBefore.attr("rangeid")); //preserve order with prepend
//                        leafBefore = leafBefore.prev();
//                    }
//                    console.log("ranges after");
//                    console.log(rangeList);
//                    console.log("update range list of range spliced out of.");
//                    
//                    console.log("ordered range ranges");
//                    console.log(rangeIDs);
//                    
//                    var paramObj2 = {"@id":leafURI, "ranges": rangeList};
//                    var params2 = {"content":JSON.stringify(paramObj2)};
//                    $.post(updateURL, params2, function(){
//                        console.log("updated");
//                        if(rangesRemoved.length > 1){
//                            var orderedRangeObject = {
//                                "@id" : "",
//                                "@type":"sc:Range",
//                                "label":"Locked Leaves" ,
//                                "canvases" : [
//                                ],
//                                "resources" : [],
//                                "ranges" : rangeIDs,
//                                "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
//                                "forProject": forProject,
//                                "within" : area.attr("rangeid"),
//                                "otherContent" : [],
//                                "lockedup" : "",
//                                "lockeddown": "",
//                                "isOrdered" : "true"
//                            };
//                            
//                            var newURL = "http://localhost:8080/brokenBooks/saveNewRange";
//                            var params = {"content":JSON.stringify(orderedRangeObject)};
//                            $.post(newURL, params, function(data){
//                                console.log("saved range, update URI");
//                                var rangeForUpdate = JSON.parse(data);
//                                var rangeToInclude = rangeForUpdate["@id"];
//                                var uniqueID = ($(".arrangeSection").length * 10) + 1;
//                                var dragAttribute = "id='drag_"+uniqueID+"' draggable='true' ondragstart='dragHelp(event);' ondragend='dragEnd(event);'";
//                                var newRange = $("<div class='arrangeSection ordered child' draggable='true' "+dragAttribute+" isOrdered='true' rangeID='"+rangeToInclude+"'></div>");
//                                console.log("go thru ranges removed2");
//                                console.log(rangesRemoved);
//                                $.each(rangesRemoved, function(){
//                                    var clone = $(this).clone();
//                                    clone.attr("relation", rangeToInclude);
//                                    $(this).remove();
//                                    newRange.append(clone);
//                                });
//                                
//                                //Need to update area ranges field to include the new group.
//                                console.log("update area ranges field");
//                                var paramObj33 = {"@id":newWithin};
//                                var params33 = {"content" : JSON.stringify(paramObj33)};
//                                $.post(getURL, params33, function(data){
//                                    var rangedata = JSON.parse(data);
//                                    var range = rangedata[0];
//                                    var ranges = range.ranges;
//                                    ranges.unshift(rangeToInclude);
//                                    var paramObj32 = {"@id":newWithin, "ranges":ranges};
//                                    var params32 = {"content":JSON.stringify(paramObj32)};
//                                    $.post(updateURL, params32, function(){
//
//                                    });
//                                });
//                                
//                                //wait for while loop. causes a small blip of the locked leaves to appear and disappear, all good. 
//                                setTimeout(function(){
//                                    console.log("update withings");
//                                    leafToLock.before(newRange);
//                                    $.each(newRange.children(), function(){
//                                        console.log("update withins of children in new group");
//                                        var paramObj5 = {"@id":$(this).attr("rangeid"),"within":rangeToInclude};
//                                        var params5 = {"content":JSON.stringify(paramObj5)};
//                                        $.post(updateURL, params5);
//                                    });
//                                },300);
//                            });
//                        }
//                        else{
//                            console.log("Otherwise, just pop out to parent");
//                            
//                            var paramObj3 = {"@id":newWithin};
//                            var params3 = {"content" : JSON.stringify(paramObj3)};
//                            $.post(getURL, params3, function(data){
//                                var rangedata = JSON.parse(data);
//                                var range = rangedata[0];
//                                var ranges = range.ranges;
//                                var index = $.inArray(leafToLockWith.parent().attr("rangeid"), ranges);
//                                ranges.splice(index,0,leafToLockWith.attr("rangeid"));
//                                leafToLockWith.remove();
//                                copy1.attr("draggable", "true").css("display", "block");
//                                leafToLock.parent().before(copy1);
//                                console.log("update range recieving popped out child");
//                                var paramObj6 = {"@id":newWithin, "ranges":ranges};
//                                var params6 = {"content":JSON.stringify(paramObj6)};
//                                $.post(updateURL, params6, function(){
//                                    
//                                });
//                                console.log("update within of range popped");
//                                var paramObj2 = {"@id":ltlwID, "within":newWithin};
//                                var params2 = {"content":JSON.stringify(paramObj2)};
//                                $.post(updateURL, params2, function(){
//                                    console.log("WITHIN 3 UPDATED");
//                                });
//                            });
//                        }
//                        
//                    });
//                    
//                });
            }
            else{
                //delete wrapping range, update withins
                //console.log("Need to delete wrapping range around locked leaves");
                var rangeToRemove = leafToLock.parent();
                var removeID = rangeToRemove.attr("rangeid");
                var updateID = rangeToRemove.parent().parent().attr("rangeid");
                var rangeBefore = rangeToRemove.prev();
                var rangeAfter = rangeToRemove.next();
                var copy1 = leafToLock.clone();
                var copy2 = leafToLockWith.clone();
                
                copy1.attr("draggable","true").css("display", "block");
                copy2.attr("draggable","true").css("display", "block");
                
                //console.log("ID to remove: "+removeID);
                var index = 0;
                if(windowURL.indexOf("demo=1") > -1){
                    $.each(rangeCollection, function(){
                        index += 1;
                        if(this["@id"] === removeID){
                            rangeCollection.splice(index,1);
                            if(rangeBefore.attr("isOrdered")==="true" || rangeBefore.attr("leaf")==="true"){
                                //console.log("range before is a leaf or ordered range");
                                rangeBefore.after(copy1);
                                rangeBefore.after(copy2);
                                rangeToRemove.remove();
                            }
                            else if(rangeAfter.attr("isOrdered")==="true" || rangeAfter.attr("leaf")==="true"){
                                //console.log("leaf after is a leaf or ordered range");
                                rangeAfter.before(copy2);
                                rangeAfter.before(copy1);
                                rangeToRemove.remove();
                            }
                            else{
                                //It is the column
                                //console.log("range being removed was the only range in the column, bring leaves up.");
                                rangeToRemove.parent().append(copy2);
                                rangeToRemove.parent().append(copy1);
                                rangeToRemove.remove();
                            }

//                            console.log("need to update ranges array of range that range was just remove from "+updateID);
//                            console.log("remove "+removeID);
//                            console.log("splice in "+copy1.attr("rangeid"),copy2.attr("rangeid") +" to "+updateID);
                            $.each(rangeCollection, function(){
                                if(this["@id"] === updateID){
                                    var range = this;
                                    var rangeList = range.ranges;
//                                    console.log("ranges before removal and splice 1");
//                                    console.log(rangeList);
                                    var index = $.inArray(removeID, rangeList);
                                    rangeList.splice(index, 1); //get rid of wrapper
                                    if($.inArray(copy1.attr("rangeid"), rangeList) === -1){
                                        rangeList.splice(index,0,copy1.attr("rangeid")); //bring up child
                                    }
                                    if($.inArray(copy2.attr("rangeid"), rangeList) === -1){
                                         rangeList.splice(index,0,copy2.attr("rangeid")); //bring up child
                                    }
//                                    console.log("ranges after removal and splice 1");
//                                    console.log(rangeList);
                                    this.ranges = rangeList;
                                }
                            });
                        }
                    });
                }
                else{
                    var paramObj = {"@id":removeID};
                    var params = {"content":JSON.stringify(paramObj)};
                    $.each(rangeCollection, function(){
                        index += 1;
                        if(this["@id"] === removeID){
                            rangeCollection.splice(index,1);
                            //updateManifestStructures();
                        }
                    });
                    $.post(removeURL, params, function(){
                        if(rangeBefore.attr("isOrdered")==="true" || rangeBefore.attr("leaf")==="true"){
                            //console.log("range before is a leaf or ordered range");
                            rangeBefore.after(copy1);
                            rangeBefore.after(copy2);
                            rangeToRemove.remove();
                        }
                        else if(rangeAfter.attr("isOrdered")==="true" || rangeAfter.attr("leaf")==="true"){
                            //console.log("leaf after is a leaf or ordered range");
                            rangeAfter.before(copy2);
                            rangeAfter.before(copy1);
                            rangeToRemove.remove();
                        }
                        else{
                            //It is the column
                            //console.log("range being removed was the only range in the column, bring leaves up.");
                            rangeToRemove.parent().append(copy2);
                            rangeToRemove.parent().append(copy1);
                            rangeToRemove.remove();
                        }

//                        console.log("need to update ranges array of range that range was just remove from "+updateID);
//                        console.log("remove "+removeID);
//                        console.log("splice in "+copy1.attr("rangeid"),copy2.attr("rangeid") +" to "+updateID);
                        $.each(rangeCollection, function(){
                            if(this["@id"] === updateID){
                                var range = this;
                                var rangeList = range.ranges;
//                                console.log("ranges before removal and splice 1");
//                                console.log(rangeList);
                                var index = $.inArray(removeID, rangeList);
                                rangeList.splice(index, 1); //get rid of wrapper
                                if($.inArray(copy1.attr("rangeid"), rangeList) === -1){
                                    rangeList.splice(index,0,copy1.attr("rangeid")); //bring up child
                                }
                                if($.inArray(copy2.attr("rangeid"), rangeList) === -1){
                                     rangeList.splice(index,0,copy2.attr("rangeid")); //bring up child
                                }
//                                console.log("ranges after removal and splice 1");
//                                console.log(rangeList);
                                var paramObj3 = {"@id":updateID, "ranges":rangeList};
                                var params3 = {"content":JSON.stringify(paramObj3)};
                                this.ranges = rangeList;
                                //updateInManifest("structures", paramObj3);
                                $.post(updateURL, params3, function(){
                                    //console.log("range list updated");
                                });
                            }
                        });
                                
                        var paramObj1 = {"@id":leafToLock.attr("rangeid"), "within":updateID};
                        var params1 = {"content":JSON.stringify(paramObj1)};
                        //updateInManifest("structures", paramObj1);
                        $.post(updateURL, params1, function(){
                            //console.log("WITHIN 1 UPDATED");
                        });
                        var paramObj2 = {"@id":leafToLockWith.attr("rangeid"), "within":updateID};
                        var params2 = {"content":JSON.stringify(paramObj2)};
                        //updateInManifest("structures", paramObj2);
                        $.post(updateURL, params2, function(){
                            //console.log("WITHIN 2 UPDATED");
                        });

                    });
                }
                
//                var paramObj = {"@id":removeID};
//                var params = {"content":JSON.stringify(paramObj)};
//                $.post(removeURL, params, function(){
//                    if(rangeBefore.attr("isOrdered")==="true" || rangeBefore.attr("leaf")==="true"){
//                        console.log("range before is a leaf or ordered range");
//                        rangeBefore.after(copy1);
//                        rangeBefore.after(copy2);
//                        rangeToRemove.remove();
//                    }
//                    else if(rangeAfter.attr("isOrdered")==="true" || rangeAfter.attr("leaf")==="true"){
//                        console.log("leaf after is a leaf or ordered range");
//                        rangeAfter.before(copy2);
//                        rangeAfter.before(copy1);
//                        rangeToRemove.remove();
//                    }
//                    else{
//                        //It is the column
//                        console.log("range being removed was the only range in the column, bring leaves up.");
//                        rangeToRemove.parent().append(copy2);
//                        rangeToRemove.parent().append(copy1);
//                        rangeToRemove.remove();
//                    }
//                    
//                    console.log("need to update ranges array of range that range was just remove from "+updateID);
//                    console.log("remove "+removeID);
//                    console.log("splice in "+copy1.attr("rangeid"),copy2.attr("rangeid") +" to "+updateID);
//                    var getParamObj = {"@id":updateID};
//                    var getParams = {"content":JSON.stringify(getParamObj)};
//                    $.post(getURL, getParams, function(data){
//                        var rangedata = JSON.parse(data);
//                        var range = rangedata[0];
//                        var rangeList = range.ranges;
//                        console.log("ranges before removal and splice 1");
//                        console.log(rangeList);
//                        var index = $.inArray(removeID, rangeList);
//                        rangeList.splice(index, 1); //get rid of wrapper
//                        if($.inArray(copy1.attr("rangeid"), rangeList) === -1){
//                            rangeList.splice(index,0,copy1.attr("rangeid")); //bring up child
//                        }
//                        if($.inArray(copy2.attr("rangeid"), rangeList) === -1){
//                             rangeList.splice(index,0,copy2.attr("rangeid")); //bring up child
//                        }
//                        console.log("ranges after removal and splice 1");
//                        console.log(rangeList);
//                        var paramObj3 = {"@id":updateID, "ranges":rangeList};
//                        var params3 = {"content":JSON.stringify(paramObj3)};
//                        $.post(updateURL, params3, function(){
//                            console.log("range list updated");
//                        });
//                    });
//                                        
//                    var paramObj1 = {"@id":leafToLock.attr("rangeid"), "within":updateID};
//                    var params1 = {"content":JSON.stringify(paramObj1)};
//                    $.post(updateURL, params1, function(){
//                        console.log("WITHIN 1 UPDATED");
//                    });
//                    var paramObj2 = {"@id":leafToLockWith.attr("rangeid"), "within":updateID};
//                    var params2 = {"content":JSON.stringify(paramObj2)};
//                    $.post(updateURL, params2, function(){
//                        console.log("WITHIN 2 UPDATED");
//                    });
//                    
//                });
            }
            area.find(".arrangeSection[rangeid='"+leafURIcpy+"']").find(".lockedUp").attr("class","lockUp").attr("onclick","lock('"+leafURIcpy+"','up',event);");
            area.find(".arrangeSection[rangeid='"+ltlwID+"']")
                .find(".lockedDown").attr("class","lockDown").attr("onclick","lock('"+ltlwID+"','down',event);");
        }
        else{
            alert("cannot unlock this way. Error 3");
        }
    }
    else{
        leafToLockWith = leafToLock.next();
        var ltlwID = leafToLockWith.attr("rangeid");
        if(leafToLockWith!== undefined && leafToLockWith.attr("class")!==undefined 
        && leafToLockWith.attr("class").indexOf("arrangeSection")>-1 && leafToLockWith.attr("leaf") === "true"){
            var lockparamobj = {"@id":leafToLock.attr("rangeid"), "lockeddown":"false"};
            var lockparams = {"content":JSON.stringify(lockparamobj)};
            if(windowURL.indexOf("demo=1") > -1){
                $.each(rangeCollection, function(){
                    if(this["@id"] === leafToLock.attr("rangeid")){
                        this.lockeddown = "false";
                    }
                });
            }
            else{
                $.each(rangeCollection, function(){
                    if(this["@id"] === leafToLockWith.attr("rangeid")){
                        this.lockedup = "false";
                    }
                });
                //updateInManifest("structures", lockparamobj);
                $.post(updateURL, lockparams, function(){

                });
            }

            //update leaf being locked with to know it is locked down.  This helps tremendously with the UI.
            var lockparamobj3 = {"@id":leafToLockWith.attr("rangeid"), "lockedup":"false"};
            var lockparams3 = {"content":JSON.stringify(lockparamobj3)};
            if(windowURL.indexOf("demo=1") > -1){
                $.each(rangeCollection, function(){
                    if(this["@id"] === leafToLockWith.attr("rangeid")){
                        this.lockedup = "false";
                    }
                });
            }
            else{
                $.each(rangeCollection, function(){
                    if(this["@id"] === leafToLock.attr("rangeid")){
                        this.lockeddown = "false";
                    }
                });
                //updateInManifest("structures", lockparamobj3);
                $.post(updateURL, lockparams3, function(){

                });
            }

            var paramObj = {"@id":leafURI};
            var params = {"content":JSON.stringify(paramObj)};
            $.post(getURL, params, function(data){
                if(numOrdered > 2){
                    leafURI = leafToLock.parent().attr("rangeid");
                    var rangeAfter = leafToLock.parent().next();
                    var leafAfter = leafToLock.next();
                    var paramObj11 = {"@id":leafURI};
                    var params11 = {"content":JSON.stringify(paramObj11)};
                    var newWithin = area.attr("rangeid");
                    var copy1 = leafToLockWith.clone();
                    $.each(rangeCollection, function(){
                        if(this["@id"] === leafURI){
                            var rangeObj = this;
                            var rangeList = rangeObj.ranges;
                            var rangesRemoved = [];
                            var rangeIDs = [];
                            //console.log("ranges before");
                            //console.log(rangeList);
                            while(leafAfter.attr("leaf")==="true"){
                                rangeList.splice( $.inArray(leafAfter.attr("rangeid"), rangeList), 1 );
                                rangesRemoved.push(leafAfter); 
                                rangeIDs.push(leafAfter.attr("rangeid"));
                                leafAfter = leafAfter.next();
                            }
//                            console.log("ranges after");
//                            console.log(rangeList);
//                            console.log("update range list of range spliced out of.");
//
//                            console.log("ordered range ranges");
//                            console.log(rangeIDs);
                            var paramObj2 = {"@id":leafURI, "ranges": rangeList};
                            var params2 = {"content":JSON.stringify(paramObj2)};
                            this.ranges = rangeList;
                            if(windowURL.indexOf("demo=1") > -1){
                                if(rangesRemoved.length > 1){
                                    //var uniqueID = $(".arrangeSection").length * 10 + 1;
                                    rangeID = parseInt(rangeID) + 1;
                                    console.log(typeof rangeID);
                            //console.log("what is rangeID: "+rangeID);
                                    var orderedRangeObject = {
                                        "@id" : "http://www.example.org/iiif/LlangBrev/range/"+rangeID,
                                        "@type":"sc:Range",
                                        "label":"Locked Leaves" ,
                                        "canvases" : [
                                        ],
                                        "resources" : [],
                                        "ranges" : rangeIDs,
                                        "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
                                        "forProject": forProject,
                                        "within" : area.attr("rangeid"),
                                        "otherContent" : [],
                                        "lockedup" : "",
                                        "lockeddown": "",
                                        "isReferencedBy":manifestID,
                                        "isOrdered" : "true"
                                    };
                                        rangeCollection.push(orderedRangeObject);
                                        //console.log("saved range, update URI");
                                        var rangeForUpdate = orderedRangeObject;
                                        var rangeToInclude = rangeForUpdate["@id"];
                                        var uniqueID2 = ($(".arrangeSection").length * 10) + 2;
                                        var dragAttribute = "id='drag_"+uniqueID2+"' draggable='true' ondragstart='dragHelp(event);' ondragend='dragEnd(event);'";
                                        var newRange = $("<div class='arrangeSection ordered child' draggable='true' "+dragAttribute+" isOrdered='true' rangeID='"+rangeToInclude+"'></div>");
                                        //console.log("go thru ranges removed1");
                                        //console.log(rangesRemoved);
                                        $.each(rangesRemoved, function(){
                                            var clone = $(this).clone();
                                            clone.attr("relation", rangeToInclude);
                                            $(this).remove();
                                            newRange.append(clone);
                                        });

                                        //Need to update area ranges field to include the new group.
                                        //console.log("update area ranges");
                                        $.each(rangeCollection, function(){
                                            if(this["@id"] === newWithin){
                                                var range = this;
                                                var rangeList2 = range.ranges;
                                                rangeList2.push(rangeToInclude);
                                                var paramObj32 = {"@id":newWithin, "ranges":rangeList2};
                                                var params32 = {"content":JSON.stringify(paramObj32)};
                                                $.post(updateURL, params32, function(){

                                                });
                                            }
                                        });
                                    
                                }
                                else{
                                    //console.log("Otherwise, just pop out to parent");
                                    var paramObj3 = {"@id":newWithin};
                                    var params3 = {"content" : JSON.stringify(paramObj3)};
                                    $.each(rangeCollection, function(){
                                        if(this["@id"] === newWithin){
                                            var range=this;
                                            var rangeList3 = range.ranges;
                                            var index = $.inArray(leafToLock.parent().attr("rangeid"), rangeList3);
                                            rangeList3.splice(index+1,0,leafToLockWith.attr("rangeid"));
                                            leafToLockWith.remove();
                                            copy1.attr("draggable", "true").css("display", "block");
                                            leafToLock.parent().after(copy1);
                                            //console.log("update range recieving popped out child");
                                            this.ranges = rangeList3;
                                        }
                                    });
                                }
                            }
                            else{
                                //updateInManifest("structures", paramObj2);
                                $.post(updateURL, params2, function(){
                                    if(rangesRemoved.length > 1){
                                        var orderedRangeObject = {
                                            "@id" : "",
                                            "@type":"sc:Range",
                                            "label":"Locked Leaves" ,
                                            "canvases" : [
                                            ],
                                            "resources" : [],
                                            "ranges" : rangeIDs,
                                            "forProject": forProject,
                                            "within" : area.attr("rangeid"),
                                            "otherContent" : [],
                                            "lockedup" : "",
                                            "lockeddown": "",
                                            "isReferencedBy":manifestID,
                                            "isOrdered" : "true"
                                        };
                                        var newURL = "http://localhost:8080/brokenBooks/saveNewRange";
                                        var params31 = {"content":JSON.stringify(orderedRangeObject)};
                                        $.post(newURL, params31, function(data){
                                            //console.log("saved range, update URI");
                                            var rangeForUpdate = JSON.parse(data);
                                            var rangeToInclude = rangeForUpdate["@id"];
                                            rangeCollection.push(rangeForUpdate);
                                            var uniqueID = ($(".arrangeSection").length * 10) + 1;
                                            var dragAttribute = "id='drag_"+uniqueID+"' draggable='true' ondragstart='dragHelp(event);' ondragend='dragEnd(event);'";
                                            var newRange = $("<div class='arrangeSection ordered child' draggable='true' "+dragAttribute+" isOrdered='true' rangeID='"+rangeToInclude+"'></div>");
//                                            console.log("go thru ranges removed1");
//                                            console.log(rangesRemoved);
                                            $.each(rangesRemoved, function(){
                                                var clone = $(this).clone();
                                                clone.attr("relation", rangeToInclude);
                                                $(this).remove();
                                                newRange.append(clone);
                                            });

                                            //Need to update area ranges field to include the new group.
                                           // console.log("update area ranges");
                                            var paramObj33 = {"@id":newWithin};
                                            var params33 = {"content" : JSON.stringify(paramObj33)};
                                            $.each(rangeCollection, function(){
                                                if(this["@id"] === newWithin){
                                                    var rangedata = JSON.parse(data);
                                                    var range = rangedata[0];
                                                    var rangeList4 = range.ranges;
                                                    rangeList4.push(rangeToInclude);
                                                    this.ranges = rangeList4;
                                                    var paramObj32 = {"@id":newWithin, "ranges":rangeList4};
                                                    var params32 = {"content":JSON.stringify(paramObj32)};
                                                    $.post(updateURL, params32, function(){

                                                    });
                                                }
                                            });
                                            //wait for while loop
                                            setTimeout(function(){
                                                leafToLock.after(newRange);
                                                //console.log("update withins.");
                                                $.each(newRange.children(), function(){
                                                   // console.log("update withins of children in new group");
                                                    var paramObj5 = {"@id":$(this).attr("rangeid"),"within":rangeToInclude};
                                                    var params5 = {"content":JSON.stringify(paramObj5)};
                                                    //updateInManifest("structures", paramObj5);
                                                    $.post(updateURL, params5);
                                                });
                                            },300);
                                        });
                                    }
                                    else{
                                       // console.log("Otherwise, just pop out to parent");
                         
                                        $.each(rangeCollection, function(){
                                            if(this["@id"] === newWithin){
                                                var range=this;
                                                var rangeList5 = range.ranges;
                                                var index = $.inArray(leafToLock.parent().attr("rangeid"), rangeList5);
                                                rangeList5.splice(index+1,0,leafToLockWith.attr("rangeid"));
                                                leafToLockWith.remove();
                                                copy1.attr("draggable", "true").css("display", "block");
                                                leafToLock.parent().after(copy1);
                                                //console.log("update range recieving popped out child");
                                                this.ranges = rangeList5;
                                                var paramObj6 = {"@id":newWithin, "ranges":rangeList5};
                                                var params6 = {"content":JSON.stringify(paramObj6)};
                                                //updateInManifest("structures", paramObj6);
                                                $.post(updateURL, params6, function(){

                                                });
                                                //console.log("update within of range popped");
                                                var paramObj2 = {"@id":ltlwID, "within":newWithin};
                                                var params2 = {"content":JSON.stringify(paramObj2)};
                                                //updateInManifest("structures", paramObj2);
                                                $.post(updateURL, params2, function(){
                                                    //console.log("WITHIN 3 UPDATED");
                                                });
                                            }
                                        });
                                    }
                                });
                            }

                            
//                            $.post(updateURL, params2, function(){
//                                if(rangesRemoved.length > 1){
//                                    var orderedRangeObject = {
//                                        "@id" : "",
//                                        "@type":"sc:Range",
//                                        "label":"Locked Leaves" ,
//                                        "canvases" : [
//                                        ],
//                                        "resources" : [],
//                                        "ranges" : rangeIDs,
//                                        "isPartOf": "http://www.example.org/iiif/LlangBrev/sequence/normal",
//                                        "forProject": forProject,
//                                        "within" : area.attr("rangeid"),
//                                        "otherContent" : [],
//                                        "lockedup" : "",
//                                        "lockeddown": "",
//                                        "isOrdered" : "true"
//                                    };
//                                    var newURL = "http://localhost:8080/brokenBooks/saveNewRange";
//                                    var params31 = {"content":JSON.stringify(orderedRangeObject)};
//                                    $.post(newURL, params31, function(data){
//                                        console.log("saved range, update URI");
//                                        var rangeForUpdate = JSON.parse(data);
//                                        var rangeToInclude = rangeForUpdate["@id"];
//                                        var uniqueID = ($(".arrangeSection").length * 10) + 1;
//                                        var dragAttribute = "id='drag_"+uniqueID+"' draggable='true' ondragstart='dragHelp(event);' ondragend='dragEnd(event);'";
//                                        var newRange = $("<div class='arrangeSection ordered child' draggable='true' "+dragAttribute+" isOrdered='true' rangeID='"+rangeToInclude+"'></div>");
//                                        console.log("go thru ranges removed1");
//                                        console.log(rangesRemoved);
//                                        $.each(rangesRemoved, function(){
//                                            var clone = $(this).clone();
//                                            clone.attr("relation", rangeToInclude);
//                                            $(this).remove();
//                                            newRange.append(clone);
//                                        });
//
//                                        //Need to update area ranges field to include the new group.
//                                        console.log("update area ranges");
//                                        var paramObj33 = {"@id":newWithin};
//                                        var params33 = {"content" : JSON.stringify(paramObj33)};
//                                        $.post(getURL, params33, function(data){
//                                            var rangedata = JSON.parse(data);
//                                            var range = rangedata[0];
//                                            var ranges = range.ranges;
//                                            ranges.push(rangeToInclude);
//                                            var paramObj32 = {"@id":newWithin, "ranges":ranges};
//                                            var params32 = {"content":JSON.stringify(paramObj32)};
//                                            $.post(updateURL, params32, function(){
//
//                                            });
//                                        });
//
//
//                                        //wait for while loop
//                                        setTimeout(function(){
//                                            leafToLock.after(newRange);
//                                            console.log("update withins.");
//                                            $.each(newRange.children(), function(){
//                                                console.log("update withins of children in new group");
//                                                var paramObj5 = {"@id":$(this).attr("rangeid"),"within":rangeToInclude};
//                                                var params5 = {"content":JSON.stringify(paramObj5)};
//                                                $.post(updateURL, params5);
//                                            });
//                                        },300);
//                                    });
//                                }
//                                else{
//                                    console.log("Otherwise, just pop out to parent");
//                                    var paramObj3 = {"@id":newWithin};
//                                    var params3 = {"content" : JSON.stringify(paramObj3)};
//                                    $.post(getURL, params3, function(data){
//                                        var rangedata = JSON.parse(data);
//                                        var range=rangedata[0];
//                                        var ranges = range.ranges;
//                                        var index = $.inArray(leafToLock.parent().attr("rangeid"), ranges);
//                                        ranges.splice(index+1,0,leafToLockWith.attr("rangeid"));
//                                        leafToLockWith.remove();
//                                        copy1.attr("draggable", "true").css("display", "block");
//                                        leafToLock.parent().after(copy1);
//                                        console.log("update range recieving popped out child");
//                                        var paramObj6 = {"@id":newWithin, "ranges":ranges};
//                                        var params6 = {"content":JSON.stringify(paramObj6)};
//                                        $.post(updateURL, params6, function(){
//
//                                        });
//                                        console.log("update within of range popped");
//                                        var paramObj2 = {"@id":ltlwID, "within":newWithin};
//                                        var params2 = {"content":JSON.stringify(paramObj2)};
//                                        $.post(updateURL, params2, function(){
//                                            console.log("WITHIN 3 UPDATED");
//                                        });
//                                    });
//                                }
//
//                            });
                        }
                    });
                    
                    
                    
                    $.post(getURL, params11, function(data){
                        var rangeObj = JSON.parse(data)[0];
                        var rangeList = rangeObj.ranges;
                        var rangesRemoved = [];
                        var rangeIDs = [];
//                        console.log("ranges before");
//                        console.log(rangeList);
                        while(leafAfter.attr("leaf")==="true"){
                            rangeList.splice( $.inArray(leafAfter.attr("rangeid"), rangeList), 1 );
                            rangesRemoved.push(leafAfter); 
                            rangeIDs.push(leafAfter.attr("rangeid"));
                            leafAfter = leafAfter.next();
                        }
//                        console.log("ranges after");
//                        console.log(rangeList);
//                        console.log("update range list of range spliced out of.");
//                        
//                        console.log("ordered range ranges");
//                        console.log(rangeIDs);
                        var paramObj2 = {"@id":leafURI, "ranges": rangeList};
                        var params2 = {"content":JSON.stringify(paramObj2)};
                        //updateInManifest("structures", paramObj2);
                        $.post(updateURL, params2, function(){
                            if(rangesRemoved.length > 1){
                                var orderedRangeObject = {
                                    "@id" : "",
                                    "@type":"sc:Range",
                                    "label":"Locked Leaves" ,
                                    "canvases" : [
                                    ],
                                    "resources" : [],
                                    "ranges" : rangeIDs,
                                    "forProject": forProject,
                                    "within" : area.attr("rangeid"),
                                    "otherContent" : [],
                                    "lockedup" : "",
                                    "lockeddown": "",
                                    "isReferencedBy":manifestID,
                                    "isOrdered" : "true"
                                };
                                var newURL = "http://localhost:8080/brokenBooks/saveNewRange";
                                var params31 = {"content":JSON.stringify(orderedRangeObject)};
                                $.post(newURL, params31, function(data){
                                    //console.log("saved range, update URI");
                                    var rangeForUpdate = JSON.parse(data);
                                    var rangeToInclude = rangeForUpdate["@id"];
                                    var uniqueID = ($(".arrangeSection").length * 10) + 1;
                                    var dragAttribute = "id='drag_"+uniqueID+"' draggable='true' ondragstart='dragHelp(event);' ondragend='dragEnd(event);'";
                                    var newRange = $("<div class='arrangeSection ordered child' draggable='true' "+dragAttribute+" isOrdered='true' rangeID='"+rangeToInclude+"'></div>");
                                    //console.log("go thru ranges removed1");
                                    //console.log(rangesRemoved);
                                    $.each(rangesRemoved, function(){
                                        var clone = $(this).clone();
                                        clone.attr("relation", rangeToInclude);
                                        $(this).remove();
                                        newRange.append(clone);
                                    });
                                    
                                    //Need to update area ranges field to include the new group.
                                    //console.log("update area ranges");
                                    var paramObj33 = {"@id":newWithin};
                                    var params33 = {"content" : JSON.stringify(paramObj33)};
                                    $.post(getURL, params33, function(data){
                                        var rangedata = JSON.parse(data);
                                        var range = rangedata[0];
                                        var ranges = range.ranges;
                                        ranges.push(rangeToInclude);
                                        var paramObj32 = {"@id":newWithin, "ranges":ranges};
                                        var params32 = {"content":JSON.stringify(paramObj32)};
                                        //updateInManifest("structures", paramObj32);
                                        $.post(updateURL, params32, function(){

                                        });
                                    });
                                    
                                    //wait for while loop
                                    setTimeout(function(){
                                        leafToLock.after(newRange);
                                        //console.log("update withins.");
                                        $.each(newRange.children(), function(){
                                            //console.log("update withins of children in new group");
                                            var paramObj5 = {"@id":$(this).attr("rangeid"),"within":rangeToInclude};
                                            var params5 = {"content":JSON.stringify(paramObj5)};
                                            //updateInManifest("structures", paramObj5);
                                            $.post(updateURL, params5);
                                        });
                                    },300);
                                });
                            }
                            else{
                                //console.log("Otherwise, just pop out to parent");
                                var paramObj3 = {"@id":newWithin};
                                var params3 = {"content" : JSON.stringify(paramObj3)};
                                $.post(getURL, params3, function(data){
                                    var rangedata = JSON.parse(data);
                                    var range=rangedata[0];
                                    var ranges = range.ranges;
                                    var index = $.inArray(leafToLock.parent().attr("rangeid"), ranges);
                                    ranges.splice(index+1,0,leafToLockWith.attr("rangeid"));
                                    leafToLockWith.remove();
                                    copy1.attr("draggable", "true").css("display", "block");
                                    leafToLock.parent().after(copy1);
                                    //console.log("update range recieving popped out child");
                                    var paramObj6 = {"@id":newWithin, "ranges":ranges};
                                    var params6 = {"content":JSON.stringify(paramObj6)};
                                    //updateInManifest("structures", paramObj6);
                                    $.post(updateURL, params6, function(){

                                    });
                                    //console.log("update within of range popped");
                                    var paramObj2 = {"@id":ltlwID, "within":newWithin};
                                    var params2 = {"content":JSON.stringify(paramObj2)};
                                    //updateInManifest("structures", paramObj2);
                                    $.post(updateURL, params2, function(){
                                        //console.log("WITHIN 3 UPDATED");
                                    });
                                });
                            }

                        });

                    });
                }
                else{
                    //delete wrapping range, update withins
                    //console.log("Need to delete wrapping range around locked leaves2" );
                    var rangeToRemove = leafToLock.parent();
                    var removeID = rangeToRemove.attr("rangeid");
                    var updateID = rangeToRemove.parent().parent().attr("rangeid");
                    var rangeBefore = rangeToRemove.prev();
                    var rangeAfter = rangeToRemove.next();
                    var copy1 = leafToLock.clone();
                    var copy2 = leafToLockWith.clone();
                    
                    copy1.attr("draggable","true").css("display", "block");
                    copy2.attr("draggable","true").css("display", "block");

                    var paramObj = {"@id":removeID};
                    var params = {"content":JSON.stringify(paramObj)};
                    var index = 0;
                    if(windowURL.indexOf("demo=1")> -1){
                        
                        $.each(rangeCollection, function(){
                            index+=1;
                            if(this["@id"] === removeID){
                                rangeCollection.splice(index,1);
                                var newWithin = rangeToRemove.parent().attr("rangeid");
                                if(rangeBefore.attr("isOrdered")==="true" || rangeBefore.attr("leaf")==="true"){
                                    //console.log("range before is a leaf or ordered range");
                                    rangeBefore.after(copy2);
                                    rangeBefore.after(copy1);
                                    rangeToRemove.remove();
                                }
                                else if(rangeAfter.attr("isOrdered")==="true" || rangeAfter.attr("leaf")==="true"){
                                    //console.log("leaf after is a leaf or ordered range");
                                    rangeAfter.before(copy1);
                                    rangeAfter.before(copy2);
                                    rangeToRemove.remove();
                                }
                                else{
                                    //It is the column
                                    //console.log("range being removed was the only range in the column, bring leaves up.");
                                    rangeToRemove.parent().append(copy1);
                                    rangeToRemove.parent().append(copy2);
                                    rangeToRemove.remove();
                                }

//                                console.log("need to update ranges array of range that range was just remove from2 "+updateID);
//                                console.log("remove "+removeID);
//                                console.log("splice in "+copy2.attr("rangeid"),copy1.attr("rangeid") +" to "+updateID);
                                var getParamObj2 = {"@id":updateID};
                                var getParams2 = {"content":JSON.stringify(getParamObj2)};
                                $.each(rangeCollection, function(){
                                    if(this["@id"] === updateID){
                                        var range = this;
                                        var rangeList = range.ranges;
//                                        console.log("range list before removal and splice");
//                                        console.log(rangeList);
                                        var index = $.inArray(removeID, rangeList);
                                        rangeList.splice( index, 1 ); //get rid of wrapper
                                        rangeList.splice(index,0,copy2.attr("rangeid")); //bring up child
                                        rangeList.splice(index,0,copy1.attr("rangeid")); //bring up child
//                                        console.log("range list after removal and splice");
//                                        console.log(rangeList);
                                        this.ranges = rangeList;
                                    }
                                });

                            }
                        });
                    }
                    else{
                        $.each(rangeCollection, function(){
                            index+=1;
                            if(this["@id"] === removeID){
                                rangeCollection.splice(index,1);
                                //updateManifestStructures();
                            }
                        });
                        $.post(removeURL, params, function(){
                            var newWithin = rangeToRemove.parent().attr("rangeid");
                            if(rangeBefore.attr("isOrdered")==="true" || rangeBefore.attr("leaf")==="true"){
                                //console.log("range before is a leaf or ordered range");
                                rangeBefore.after(copy2);
                                rangeBefore.after(copy1);
                                rangeToRemove.remove();
                            }
                            else if(rangeAfter.attr("isOrdered")==="true" || rangeAfter.attr("leaf")==="true"){
                                //console.log("leaf after is a leaf or ordered range");
                                rangeAfter.before(copy1);
                                rangeAfter.before(copy2);
                                rangeToRemove.remove();
                            }
                            else{
                                //It is the column
                                //console.log("range being removed was the only range in the column, bring leaves up.");
                                rangeToRemove.parent().append(copy1);
                                rangeToRemove.parent().append(copy2);
                                rangeToRemove.remove();
                            }

//                            console.log("need to update ranges array of range that range was just remove from2 "+updateID);
//                            console.log("remove "+removeID);
//                            console.log("splice in "+copy2.attr("rangeid"),copy1.attr("rangeid") +" to "+updateID);

                            $.each(rangeCollection, function(){
                                if(this["@id"] === updateID){
                                    var range = this;
                                    var rangeList = range.ranges;
//                                    console.log("range list before removal and splice");
//                                    console.log(rangeList);
                                    var index = $.inArray(removeID, rangeList);
                                    rangeList.splice( index, 1 ); //get rid of wrapper
                                    rangeList.splice(index,0,copy2.attr("rangeid")); //bring up child
                                    rangeList.splice(index,0,copy1.attr("rangeid")); //bring up child
//                                    console.log("range list after removal and splice");
//                                    console.log(rangeList);
                                    this.ranges = rangeList;
                                    var paramObj3 = {"@id":updateID, "ranges":rangeList};
                                    var params3 = {"content":JSON.stringify(paramObj3)};
                                    //updateInManifest("structures", paramObj3);
                                    $.post(updateURL, params3, function(){
                                        //console.log("range list updated");
                                    });
                                }
                            });

                            var paramObj1 = {"@id":leafToLock.attr("rangeid"), "within":newWithin};
                            var params1 = {"content":JSON.stringify(paramObj1)};
                            //updateInManifest("structures", paramObj1);
                            $.post(updateURL, params1, function(){
                                //console.log("WITHIN 1 UPDATED");
                            });
                            var paramObj2 = {"@id":leafToLockWith.attr("rangeid"), "within":newWithin};
                            var params2 = {"content":JSON.stringify(paramObj2)};
                            //updateInManifest("structures", paramObj2);
                            $.post(updateURL, params2, function(){
                                //console.log("WITHIN 2 UPDATED");
                            });

                        });
                    }

//                    $.post(removeURL, params, function(){
//                        var newWithin = rangeToRemove.parent().attr("rangeid");
//                        if(rangeBefore.attr("isOrdered")==="true" || rangeBefore.attr("leaf")==="true"){
//                            console.log("range before is a leaf or ordered range");
//                            rangeBefore.after(copy2);
//                            rangeBefore.after(copy1);
//                            rangeToRemove.remove();
//                        }
//                        else if(rangeAfter.attr("isOrdered")==="true" || rangeAfter.attr("leaf")==="true"){
//                            console.log("leaf after is a leaf or ordered range");
//                            rangeAfter.before(copy1);
//                            rangeAfter.before(copy2);
//                            rangeToRemove.remove();
//                        }
//                        else{
//                            //It is the column
//                            console.log("range being removed was the only range in the column, bring leaves up.");
//                            rangeToRemove.parent().append(copy1);
//                            rangeToRemove.parent().append(copy2);
//                            rangeToRemove.remove();
//                        }
//
//                        console.log("need to update ranges array of range that range was just remove from2 "+updateID);
//                        console.log("remove "+removeID);
//                        console.log("splice in "+copy2.attr("rangeid"),copy1.attr("rangeid") +" to "+updateID);
//                        var getParamObj2 = {"@id":updateID};
//                        var getParams2 = {"content":JSON.stringify(getParamObj2)};
//                        $.post(getURL, getParams2, function(data2){
//                            var rangedata = JSON.parse(data2);
//                            var range = rangedata[0];
//                            var rangeList = range.ranges;
//                            console.log("range list before removal and splice");
//                            console.log(rangeList);
//                            var index = $.inArray(removeID, rangeList);
//                            rangeList.splice( index, 1 ); //get rid of wrapper
//                            rangeList.splice(index,0,copy2.attr("rangeid")); //bring up child
//                            rangeList.splice(index,0,copy1.attr("rangeid")); //bring up child
//                            console.log("range list after removal and splice");
//                            console.log(rangeList);
//                            var paramObj3 = {"@id":updateID, "ranges":rangeList};
//                            var params3 = {"content":JSON.stringify(paramObj3)};
//                            $.post(updateURL, params3, function(){
//                                console.log("range list updated");
//                            });
//                        });
//
//                        var paramObj1 = {"@id":leafToLock.attr("rangeid"), "within":newWithin};
//                        var params1 = {"content":JSON.stringify(paramObj1)};
//                        $.post(updateURL, params1, function(){
//                            console.log("WITHIN 1 UPDATED");
//                        });
//                        var paramObj2 = {"@id":leafToLockWith.attr("rangeid"), "within":newWithin};
//                        var params2 = {"content":JSON.stringify(paramObj2)};
//                        $.post(updateURL, params2, function(){
//                            console.log("WITHIN 2 UPDATED");
//                        });
//
//                    });
                }
                area.find(".arrangeSection[rangeid='"+leafURIcpy+"']").find(".lockedDown").attr("class","lockDown").attr("onclick","lock('"+leafURIcpy+"','down',event);");
                area.find(".arrangeSection[rangeid='"+ltlwID+"']")
                .find(".lockedUp").attr("class","lockUp").attr("onclick","lock('"+ltlwID+"','up',event);");
            });
        }
        else{
            alert("cannot unlock this way. Error 3");
        }
    }
}

function closeLeafPopover(){
    $(".leafPopover").hide();
    $(".content").val("");
    $("tr[set='set']").attr("set", "");
    $("#notes").attr("set", "");
    $("#leafLabel").val("");
    $("#folio1Label").val("");
    $("#folio2Label").val("");
    $("#oneAndtwoLabel").val("");
    $("#oneAndtwo").find(".rectoImg").attr("src","http://localhost:8080/brokenBooks/images/imgNotFound.png");
    $("#oneAndtwo").find(".versoImg").attr("src","http://localhost:8080/brokenBooks/images/imgNotFound.png");
    $("#leafTmp").find(".rectoImg").attr("src","http://localhost:8080/brokenBooks/images/imgNotFound.png");
    $("#leafTmp").find(".versoImg").attr("src","http://localhost:8080/brokenBooks/images/imgNotFound.png");
    $("#folioSide1").find(".rectoImg").attr("src","http://localhost:8080/brokenBooks/images/addImg.jpg");
    $("#folioSide2").find(".versoImg").attr("src","http://localhost:8080/brokenBooks/images/addImg.jpg");
    //$(".popoverTrail").find(".selectedSection:first").click();
    annoListCollection = new Array(3);
    $(".selectedFolio").removeClass("selectedFolio");
    alpha=beta=zeta=false;
    $(".popoverTrail").find("div[depth='1']").find('.notBucket').empty();
}

function detectWho(){
    var url = window.location.href;
            //use that user
    var user = "unknown";
    if(url.indexOf("user=")>-1){
        user = /user=([^&]+)/.exec(url)[1]; 
    }
    var newUserID = user ? user : 'unknown';
    if(newUserID !== "unknown"){
        newUserID = "broken_books_"+newUserID;
    }
//    if(windowURL.indexOf("LFD") > -1){
//        who = "broken_books_lisa";
//    }
//    else if(windowURL.indexOf("DTC") > -1){
//        who = "broken_books_debra";
//    }
//    else if (windowURL.indexOf("RC") > -1){
//        who = "broken_books_ray";
//    }
//    else{ //TODO: something else maybe...sandbox it?
//        who = "broken_books_debra";
//    }
    return newUserID;
}

