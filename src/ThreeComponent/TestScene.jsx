import React, { useEffect, useState } from 'react'

function TestScene() {


    const [orientationData, setOrientationData] = useState({
        alpha: null,
        beta: null,
        gamma: null
      });

    useEffect(() => {
        const handleOrientation = (event) => {
          console.log('Orientation data received:', event);
          setOrientationData({
            alpha: event.alpha,
            beta: event.beta,
            gamma: event.gamma
          });
        };
    
        const requestPermissionForIOS = async () => {
          if (typeof DeviceOrientationEvent.requestPermission === 'function') {
            try {
              const permissionState = await DeviceOrientationEvent.requestPermission();
              if (permissionState === 'granted') {
                window.addEventListener('deviceorientation', handleOrientation);
              } else {
                alert('Permission was denied');
              }
            } catch (error) {
              alert('Error requesting device orientation permission: ' + error);
            }
          }
        };
    
        if (typeof DeviceOrientationEvent !== 'undefined') {
          // Request permission for iOS 13+
          requestPermissionForIOS();
    
          // Add event listener for non-iOS or older iOS versions
          if (!('requestPermission' in DeviceOrientationEvent)) {
            window.addEventListener('deviceorientation', handleOrientation);
          }
        } else {
          alert('Device orientation is not supported on this device.');
        }
    
        return () => {
          window.removeEventListener('deviceorientation', handleOrientation);
        };
      }, []);
  return (
    <div>
      <h1>Device Orientation Data:</h1>
      {orientationData.alpha !== null && orientationData.beta !== null && orientationData.gamma !== null ? (
        <ul>
          <li>Alpha: {orientationData.alpha}</li>
          <li>Beta: {orientationData.beta}</li>
          <li>Gamma: {orientationData.gamma}</li>
        </ul>
      ) : (
        <p>Waiting for orientation data...</p>
      )}
    </div>
  )
}

export default TestScene