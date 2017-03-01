package com.zynle;

import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "Zynle";
    }


   /* @Override
    protected void onDestroy() {
        super.onDestroy();
        mreaderManager.handler.onDestroy();
    }


    @Override
    public void onStart() {
    }

    @Override
    public void onStop() {
        super.onStop();
        mreaderManager.handler.powerOff();

    }*/
}
