//package com.finalpnpservice.app;
//
//import android.content.Context;
//import android.content.Intent;
//import android.os.Bundle;
//
//public class MyPushNotificationReceiver extends GcmReceiver {
//    @Override
//    public void onReceive(Context context, Intent intent) {
//        Bundle extras = intent.getExtras();
//        if (extras != null) {
//            String message = extras.getString("message");
//            // Do something with the message, such as show a notification
//        }
//    }
//}