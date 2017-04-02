// Copyright 2016 Google Inc.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//      http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

var dataCacheName = 'lotusCal-data-v1';
var cacheName = 'lotusCalc-1';
var filesToCache = [
  '/LotusCalculator',
  'index.html',
  'js/app.js',
  'js/angular.min.js',
  'css/style.css',
  'images/bg.jpg',
  'favicons/android-chrome-192x192.png',
  'favicons/android-chrome-512x512.png',
  'favicons/apple-touch-icon.png',
  'favicons/browserconfig.xml',
  'favicons/favicon-16x16.png',
  'favicons/favicon-32x32.png',
  'favicons/favicon.ico',
  'favicons/mstile-70x70.png',
  'favicons/mstile-144x144.png',
  'favicons/mstile-150x150.png',
  'favicons/mstile-310x150.png',
  'favicons/mstile-310x310.png',
  'favicons/safari-pinned-tab.svg',
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName && key !== dataCacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  /*
   * Fixes a corner case in which the app wasn't returning the latest data.
   * You can reproduce the corner case by commenting out the line below and
   * then doing the following steps: 1) load app for first time so that the
   * initial New York City data is shown 2) press the refresh button on the
   * app 3) go offline 4) reload the app. You expect to see the newer NYC
   * data, but you actually see the initial data. This happens because the
   * service worker is not yet activated. The code below essentially lets
   * you activate the service worker faster.
   */
  return self.clients.claim();
});

