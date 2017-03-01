package com.zynle;

import android.os.Handler;
import android.os.Looper;
import android.util.Log;
import android.widget.Toast;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

//import iMagPay modules
import com.imagpay.MessageHandler;
import com.imagpay.SwipeEvent;
import com.imagpay.SwipeHandler;
import com.imagpay.SwipeListener;

import java.io.Console;

public class mreaderManager extends ReactContextBaseJavaModule {

    ReactApplicationContext reactContext;

    public static SwipeHandler handler;

    private boolean _testFlag = false;

    private Handler _ui;


    public mreaderManager(ReactApplicationContext reactContext){

        super(reactContext);
        this.reactContext = reactContext;

        //run();

    }

    //override getName function
    @Override
    public String getName(){
        return "mreaderManager";
    }

    //function body
    @ReactMethod
    public void greetUser(String name, Callback callback){

        String greeting = "Welcome " + name;

        callback.invoke(greeting);

    }


    //run method
    @ReactMethod
    public synchronized void run(final Callback callback){

       try {
           //instantiate swipe handler
           handler = new SwipeHandler(reactContext);
           handler.setReadonly(true);

           //init threading handler
           _ui = new Handler(Looper.getMainLooper());

           //declare swipe listener
           SwipeListener listener = new SwipeListener() {

               @Override
               public void onDisconnected(SwipeEvent swipeEvent) {

                   Toast someToast = Toast.makeText(getReactApplicationContext(),"Card Reader is disconnected!", Toast.LENGTH_LONG);
                   someToast.show();
                   //onStop();

                   try {
                       //Events.OnBrowserExternalEvent(null, "on disconnect");
                   } catch (Exception e) {
                       e.printStackTrace();
                   }

               }

               @Override
               public void onConnected(SwipeEvent swipeEvent) {

                   Toast someToast = Toast.makeText(getReactApplicationContext(),"Card Reader is connected!", Toast.LENGTH_LONG);
                   someToast.show();
                   onStart();

               }

               @Override
               public void onStarted(SwipeEvent swipeEvent) {

               }

               @Override
               public void onStopped(SwipeEvent swipeEvent) {

               }

               @Override
               public void onReadData(SwipeEvent swipeEvent) {

               }

               @Override
               public void onParseData(SwipeEvent event) {
                   Log.d("myApp", "onparsedata1") ;

                   String result = event.getValue();
                   Log.d("myApp", result);


                   // hex string message
                   //sendMessage("Final(16)=>% " + result);

                   String[] tmps = event.getValue().split(" ");
                   StringBuffer sbf = new StringBuffer();
                   for (String str : tmps) {
                       sbf.append((char) Integer.parseInt(str, 16));
                       sbf.append(" ");
                   }
                   // char message: b{card number}^{card holder}^{exp date}{other track1 data}?;{track2 data}
                   // or            b{card number}&{card holder}&{exp date}{other track1 data}?;{track2 data}

                   final String data = sbf.toString().replaceAll(" ", "");
                   int idx = data.indexOf("^");

                   // plain text of card data
                   if (data.toUpperCase().startsWith("B") && idx > 0 && data.indexOf("?") > 0) {
                       //sendMessage("Final(10)=>% " + data);
                       _ui.post(new Runnable() {
                           @Override
                           public void run() {
                               int idx = data.indexOf("^");
                               String cardNo = data.substring(1, idx);
                               String cardHolder = "";
                               String expDate = "";
                               int idx1 = data.indexOf("^", idx + 1);
                               if (idx1 > 0 && idx1 < data.length() - 4) {
                                   cardHolder = data.substring(idx + 1, idx1);
                                   expDate = data.substring(idx1 + 1, idx1 + 1 + 4);
                               }

                               Log.d("myApp", cardNo);
                               Log.d("myApp", cardHolder);
                               Log.d("myApp", expDate);


                               
                               Toast someToast = Toast.makeText(getReactApplicationContext(),"Read card succussfuly!", Toast.LENGTH_LONG);
                               someToast.show();

                                callback.invoke(cardNo, cardHolder, expDate);

                               //callbackContext.success(cardNo + "@" + expDate + "@" + cardHolder);
                               //PluginResult progressResult = new PluginResult(PluginResult.Status.OK, cardNo + "/" + cardHolder + "/" + expDate);
                               //progressResult.setKeepCallback(true);
                               //callbackContext.sendPluginResult(progressResult);


                           }
                       });
                   }
                   // encryption data of card data
                   else if (data.length() > 20 + 5 + 4) {
                       _ui.post(new Runnable() {
                           @Override
                           public void run() {
                               Log.d("myApp", "*****");
                               String cardNo = data.substring(1, data.indexOf("="));
                               String cardHolder = data.substring(data.indexOf("=")+5);
                               String expDate =data.substring(data.indexOf("=")+1, data.indexOf("=")+5);

                               Toast someToast = Toast.makeText(getReactApplicationContext(),"Read card succussfuly!", Toast.LENGTH_LONG);
                               someToast.show();

                               //PluginResult progressResult = new PluginResult(PluginResult.Status.OK,cardNo + "/" + cardHolder + "/" + expDate);
                               //progressResult.setKeepCallback(true);
                               //callbackContext.sendPluginResult(progressResult);
                           }
                       });
                   } else {
                       _ui.post(new Runnable() {
                           @Override
                           public void run() {
                               Log.d("myApp", "---");

                               Toast someToast = Toast.makeText(getReactApplicationContext(),"Failed to scan card. please try again.", Toast.LENGTH_LONG);
                               someToast.show();

                               //Log.d("myApp", "Failed to scan card. please try again.");

                               //PluginResult progressResult = new PluginResult(PluginResult.Status.ERROR,"Failed to scan card. please try again.");
                               //progressResult.setKeepCallback(true);
                               //callbackContext.sendPluginResult(progressResult);
                           }
                       });
                   }
               }

               @Override
               public void onICDetected(SwipeEvent swipeEvent) {

               }
           };

           handler.addSwipeListener(listener);


           checkDevice();

       } catch(Exception e){

           Log.e("zynletest", "The error is: " + e);
       }
    }


    private  void checkDevice() {
        new Thread(new Runnable() {
            @Override
            public void run() {

                if (!handler.isConnected()) {
                    // toggleConnectStatus();
                    return;
                }
                if (handler.isPowerOn()) {
                    //toggleConnectStatus();
                    return;
                }
                if (handler.isReadable()) {
                    Toast someToast = Toast.makeText(getReactApplicationContext(),"Device is ready", Toast.LENGTH_LONG);
                    someToast.show();

                    handler.powerOn();
                    handler.powerOn(10000, 1, (short)0, Short.MAX_VALUE, 22050);
                } else {

                    _testFlag = true;

                    Toast someToast = Toast.makeText(getReactApplicationContext(),"Please wait! testing parameter now", Toast.LENGTH_LONG);
                    someToast.show();


                    if (handler.test() && handler.isReadable()) {
                        _testFlag = false;
                        someToast.makeText(getReactApplicationContext(),"Device is ready", Toast.LENGTH_LONG);
                        someToast.show();


                        handler.powerOn();
                    } else {
                        _testFlag = false;
                        someToast.makeText(getReactApplicationContext(),"Device is not supported or Please close some audio effects(SRS/DOLBY/BEATS/JAZZ/Classic...) and insert device!", Toast.LENGTH_LONG);
                        someToast.show();
                    }
                }
            }
        }).start();



                //toggleConnectStatus();

    }

   /* private void toggleConnectStatus() {
        _ui.postDelayed(new Runnable() {
            @Override
            public void run() {
                if (handler.isConnected() && handler.isPowerOn()
                        && handler.isReadable()) {



                } else {


                }
            }
        }, 500);
    }*/

    public void onStart() {
        checkDevice();
    }

    public void onStop() {
        handler.powerOff();
    }

    @ReactMethod
    public void onDestroy(){
        handler.onDestroy();
        Toast someToast = Toast.makeText(getReactApplicationContext(),"onDestroy Has been called", Toast.LENGTH_LONG);
        someToast.show();
    }
}
