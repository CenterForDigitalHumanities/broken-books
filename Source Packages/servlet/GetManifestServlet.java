/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlet;

import common.Constant;
import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;
import java.net.URLEncoder;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

/**
 *
 * @author hanyan
 */
public class GetManifestServlet extends HttpServlet {
    private String username;
    private static String url = "";
    private static final String context = "http://www.shared-canvas.org/ns/context.json";
    private static final String type = "sc:Manifest";

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        url = request.getContextPath() + "/getManifest";
        username = request.getParameter("username");
        String ranges = "";
        JSONArray a_metadata = new JSONArray();
        if(username.equals("debra")){
            ranges = getAnnoByProperties("{\"@type\":\"sc:Range\",\"forProject\":\"broken_books_debra\"}");
            JSONObject metadata1 = new JSONObject();
            JSONObject metadata2 = new JSONObject();
            JSONObject metadata3 = new JSONObject();
            metadata1.element("label", "Title");
            metadata1.element("value", "Llangattock Breviary Reconstruction");
            metadata2.element("label", "Created By");
            metadata2.element("value", "SLU Center for Digital Humanities");
            metadata3.element("label", "Anchor Object"); //<img class='bbanchor' src='../brokenBooks/images/anchor.png'/>
            metadata3.element("value", "http://ds.lib.berkeley.edu/VFLMS002_44");
            a_metadata.add(metadata1);
            a_metadata.add(metadata2);
            a_metadata.add(metadata3);
        }
        else if(username.equals("lisa")){
            ranges = getAnnoByProperties("{\"@type\":\"sc:Range\",\"forProject\":\"broken_books_lisa\"}");
            JSONObject metadata1 = new JSONObject();
            JSONObject metadata2 = new JSONObject();
            JSONObject metadata3 = new JSONObject();
            metadata1.element("label", "Title");
            metadata1.element("value", "Beauvais Missal Reconstruction");
            metadata2.element("label", "Created By");
            metadata2.element("value", "Lisa Fagin Davis");
            metadata3.element("label", "Anchor Object");
            metadata3.element("value", "http://ds.lib.berkeley.edu/Ege15_40");
            a_metadata.add(metadata1);
            a_metadata.add(metadata2);
            a_metadata.add(metadata3);
        }
        else if(username.equals("karen")){
            ranges = getAnnoByProperties("{\"@type\":\"sc:Range\",\"forProject\":\"broken_books_karen\"}");
            JSONObject metadata1 = new JSONObject();
            JSONObject metadata2 = new JSONObject();
            JSONObject metadata3 = new JSONObject();
            metadata1.element("label", "Title");
            metadata1.element("value", "Karen's Recontruction Project");
            metadata2.element("label", "Created By");
            metadata2.element("value", "Karen Winslow");
            metadata3.element("label", "Anchor Object");
            metadata3.element("value", "http://brokenbooks.org");
            a_metadata.add(metadata1);
            a_metadata.add(metadata2);
            a_metadata.add(metadata3);
        }
        else { //if(username.equals("UNKNOWN"))
            //ranges are empty
            JSONObject metadata1 = new JSONObject();
            JSONObject metadata2 = new JSONObject();
            JSONObject metadata3 = new JSONObject();
            metadata1.element("label", "Title");
            metadata1.element("value", "This is an Unknown project");
            metadata2.element("label", "Created By");
            metadata2.element("value", "Unknown");
            metadata3.element("label", "Anchor Object");
            metadata3.element("value", "http://brokenbooks.org");
            a_metadata.add(metadata1);
            a_metadata.add(metadata2);
            a_metadata.add(metadata3);
        }
       // JSONArray ja_ranges_unordered = JSONArray.fromObject(ranges);
        
        /*
        We have come across a massive issue.  Mirador tends to order the ranges based off the order they are returned here,
        not by the ranges[] property of a range that is used to build order.  They look at structures as @list as if the
        order is correct. 
        FIXME:  One range cannot be listed in multiple ranges' ranges[] field.
        
        Since this is a "grab all and store" situation, we will have to traverse the ranges and get them in order here like we do
        with the sort_order algorithm.  
        
        We should probab
        ly do the sequence while we are at it since the leaf ranges will list the canvases, save that for round 2.
        
        */
        
        JSONArray ja_ranges = JSONArray.fromObject(ranges);
        //orderStructures(ja_ranges_unordered);
        
        JSONArray ja_canvases;
        JSONArray ja_sequences = new JSONArray();
        JSONObject jo_sequence = new JSONObject();
        jo_sequence.element("@id", "http://165.134.241.141/brokenBooks/sequence/normal");
        jo_sequence.element("@type", "sc:Sequence");
        JSONObject rv = new JSONObject();
        String canvases = "";
        if(username.equals("debra")){
            canvases = getAnnoByProperties("{\"@type\":\"sc:Canvas\",\"forProject\":\"broken_books_debra\"}");
            jo_sequence.element("label", "Llangattock Canvases");
            rv.element("label", "Llangattock Breviary");
        }else if(username.equals("lisa")){
            canvases = getAnnoByProperties("{\"@type\":\"sc:Canvas\",\"forProject\":\"broken_books_lisa\"}");
            jo_sequence.element("label", "Beauvais Missal Canvases");
            rv.element("label", "Beauvais Missal");
        }
        else if (username.equals("karen")){
            canvases = getAnnoByProperties("{\"@type\":\"sc:Canvas\",\"forProject\":\"broken_books_karen\"}");
            jo_sequence.element("label", "Karen's Recontruction Canvases");
            rv.element("label", "Karen's Recontruction");
        }
        else{
            jo_sequence.element("label", "Unknown Canvases");
            rv.element("label", "Unknown Recontruction");
        }
        //System.out.println("Canvases are what?");
        //System.out.println(canvases);
        if(null != canvases && "" != canvases){
            ja_canvases  = JSONArray.fromObject(canvases);
            jo_sequence.element("canvases", ja_canvases);
        }else{
            ja_canvases = new JSONArray();
            jo_sequence.element("canvases", ja_canvases);
        }

        ja_sequences.add(jo_sequence);
        rv.element("@id", url);
        rv.element("@context", context);
        rv.element("@type", type);
        rv.element("metadata", a_metadata);
        rv.element("structures", ja_ranges);
        //the canvases need to go into the first object of this array
        rv.element("sequences", ja_sequences);
        response.getWriter().print(rv.toString());
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        this.doPost(req, resp);
    }
    
//    private JSONArray orderStructures(JSONArray ja_unordered){ //O(n2) + O(n)
//        //System.out.println("I wanna order them...");
//        JSONArray ja_ordered = new JSONArray();
//        JSONObject parentest = getParentestInOrder(ja_unordered); //parentest JSON object containing the top-level ordering
//        ja_ordered.add(parentest); //it is first in the ordered array.
//        JSONArray parentest_uris = parentest.getJSONArray("ranges"); //look at the first level children
//        JSONArray ja_toReturn = new JSONArray();
//        for(int i=0; i<parentest_uris.size(); i++){ // go over each URI
//            //System.out.println("parent: "+parentest_uris.getString(i));
//            if(i == parentest_uris.size() - 1){ //if we are on the last parent, we will want to return
//                ja_toReturn = getAllChildren(ja_ordered, parentest_uris.getString(i), ja_unordered);
//            }
//            else{
//                getAllChildren(ja_ordered, parentest_uris.getString(i), ja_unordered); //send it off to be resolved recursively through all its children's relations  
//            }
//            
//        }
//        //System.out.println("RETURNED ORDER STRUCTURES");
//        return ja_toReturn; //this will be all parents child_tree arrays flattened in order. 
//    } 
//    
//    private JSONObject getParentestInOrder(JSONArray ja_unordered){ //O(n)
//        JSONObject outer = new JSONObject();
//        //System.out.println("looking for parentest");
//        for(int i=0; i<ja_unordered.size(); i++){
//            if(ja_unordered.getJSONObject(i).has("parent") && ja_unordered.getJSONObject(i).getString("parent").contains("paggr")){ //for IIIF, maybe within:"root" instead of parent:'paggr_blahblahblah'.  
//                outer = ja_unordered.getJSONObject(i);
//                //System.out.println("found it");
//                break; //no need to keep looking, there is only 1.
//            }
//        }
//        return outer;
//    }
//   
//    private JSONArray getAllChildren(JSONArray rangesSoFar, String range_uri, JSONArray unordered){ //O(n)
//        //System.out.println("get children...");
//        JSONArray next_level_children = new JSONArray();
//        JSONObject rangeForOrder = pullFromStructures(range_uri, unordered); //get the range from the unordered structures array we already have.
//        try{ //imagine a 404 scenario.  ranges[] contained a URI that no longer exists in the store.
//            next_level_children = rangeForOrder.getJSONArray("ranges");
//            rangesSoFar.add(rangeForOrder);
//        }
//        catch (Exception e){ //if it is a bad range, we want to ignore it.
//            //System.out.println("We got a bad range..." +range_uri);
//            //System.out.println(rangeForOrder);
//        }
//        //System.out.println("get next level children of size "+next_level_children.size());
//        if(next_level_children.size() > 0){ //if it has children
//            for(int j=0; j<next_level_children.size(); j++){ //look at its child
//                getAllChildren(rangesSoFar, next_level_children.getString(j), unordered); // and get its children, recursively
//            }
//        }
//        //System.out.println("no more children.  return ranges so far of size "+rangesSoFar.size());
//        return rangesSoFar; 
//       // this will only be returned once we have gotten through the child tree for the URI given. it could be empty, thats a legit situation.
//    }
//    
//    private JSONObject pullFromStructures(String uri, JSONArray structures){
//        JSONObject pull_this_out = new JSONObject();
//        for(int i=0; i<structures.size(); i++){
//            if(structures.getJSONObject(i).getString("@id").equals(uri)){
//                pull_this_out = structures.getJSONObject(i);
//                break;
//            }
//        }
//        return pull_this_out;
//    }
    
    private String getAnnoByProperties(String properties){
        StringBuilder sb = new StringBuilder();
        try {
            URL postUrl = new URL(Constant.ANNOTATION_SERVER_ADDR + "/anno/getAnnotationByProperties.action");
            HttpURLConnection connection = (HttpURLConnection) postUrl.openConnection();
            connection.setDoOutput(true);
            connection.setDoInput(true);
            connection.setRequestMethod("POST");
            connection.setUseCaches(false);
            connection.setInstanceFollowRedirects(true);
            connection.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
            connection.connect();
            DataOutputStream out = new DataOutputStream(connection.getOutputStream());
            //value to save
            out.writeBytes("content=" + URLEncoder.encode(properties, "utf-8"));
            out.flush();
            out.close(); // flush and close
            BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream(),"utf-8"));
            String line="";
            while ((line = reader.readLine()) != null){
                //line = new String(line.getBytes(), "utf-8");
                sb.append(line);
            }
            reader.close();
            connection.disconnect();
        } catch (MalformedURLException ex) {
            Logger.getLogger(GetManifestServlet.class.getName()).log(Level.SEVERE, null, ex);
        } catch (ProtocolException ex) {
            Logger.getLogger(GetManifestServlet.class.getName()).log(Level.SEVERE, null, ex);
        } catch (IOException ex) {
            Logger.getLogger(GetManifestServlet.class.getName()).log(Level.SEVERE, null, ex);
        }
        return sb.toString();
    }
       
}
