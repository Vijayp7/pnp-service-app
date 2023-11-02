//package com.finalpnpservice.app;
//
//import android.content.Context;
//import com.getcapacitor.JSObject;
//import com.getcapacitor.NativePlugin;
//import com.getcapacitor.Plugin;
//import com.getcapacitor.PluginCall;
//import com.getcapacitor.PluginMethod;
//import com.getcapacitor.annotation.CapacitorPlugin;
//
//@CapacitorPlugin(name = "LocalStoragePlugin")
//public class LocalStoragePlugin extends Plugin {
//
//    @NativePlugin
//    public interface JSBridge {
//        @PluginMethod
//        void sendDataToAndroid(PluginCall call);
//    }
//
//    @Override
//    public void load() {
//        JSBridge jsBridge = new JSBridge() {
//            @Override
//            public void sendDataToAndroid(PluginCall call) {
//                JSObject data = call.getData();
//                // Process the received data from the React component
//                String value = data.getString("key");
//                // Additional data processing
//
//                // Use the received data in your Android class as needed
//            }
//        };
//        bridge.registerPlugin(jsBridge);
//    }
//}
