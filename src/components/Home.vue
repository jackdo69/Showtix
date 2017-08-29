<template>
    <div>
      <h1>Main events</h1>
      <hr />
        <ul>
              <li class="single_event">
                <div class="row">
                  <div class="col-sm-3">
                    <img src="http://www.kontrolmag.com/wp-content/uploads/2017/01/adele.jpg" />
                  </div>
                  <div class="col-sm-6">
                    <p class="text-info">

                      <b>Venue: Anz Stadium | Date: 20 Sept | Time: 6 pm</b>
                    </p>
                    <p>Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                       Ut posuere dictum sem bibendum ultricies. Morbi euismod id eros non tristique.
                       Donec dapibus libero in ligula sagittis, eu commodo ligula feugiat.
                     </p>
                  </div>
                  <div class="col-sm-3">
                    <button class="btn btn-primary">View Details</button>
                  </div>
              </div>
              </li>
            <hr />
            <li class="single_event">
              <div class="row">
                <div class="col-sm-3">
                  <img src="https://eclecticmusiclover.files.wordpress.com/2016/08/coldplay-tour-pic.jpg" />
                </div>
                <div class="col-sm-6">
                  <p class="text-info">

                    <b>Venue: Anz Stadium | Date: 20 Sept | Time: 6 pm</b>
                  </p>
                  <p>Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                     Ut posuere dictum sem bibendum ultricies. Morbi euismod id eros non tristique.
                     Donec dapibus libero in ligula sagittis, eu commodo ligula feugiat.
                   </p>
                </div>
                <div class="col-sm-3">
                  <button class="btn btn-primary">View Details</button>
                </div>
            </div>
            </li>
          <hr />
          <li class="single_event">
            <div class="row">
              <div class="col-sm-3">
                <img src="http://img.wennermedia.com/social/bruno-mars--press-photo-2---kai-z-feng-885f1d8b-0fc8-4ea6-a613-06ef6ce4e443.jpg" />
              </div>
              <div class="col-sm-6">
                <p class="text-info">

                  <b>Venue: Anz Stadium | Date: 20 Sept | Time: 6 pm</b>
                </p>
                <p>Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                   Ut posuere dictum sem bibendum ultricies. Morbi euismod id eros non tristique.
                   Donec dapibus libero in ligula sagittis, eu commodo ligula feugiat.
                 </p>
              </div>
              <div class="col-sm-3">
                <button class="btn btn-primary">View Details</button>
              </div>
          </div>
          </li>
        <hr />
        <li class="single_event">
          <div class="row">
            <div class="col-sm-3">
              <img src="https://static.independent.co.uk/s3fs-public/thumbnails/image/2016/01/29/11/Taylor-Swift-revenge-nerds.jpg" />
            </div>
            <div class="col-sm-6">
              <p class="text-info">

                <b>Venue: Anz Stadium | Date: 20 Sept | Time: 6 pm</b>
              </p>
              <p>Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                 Ut posuere dictum sem bibendum ultricies. Morbi euismod id eros non tristique.
                 Donec dapibus libero in ligula sagittis, eu commodo ligula feugiat.
               </p>
            </div>
            <div class="col-sm-3">
              <button class="btn btn-primary" onclick="/Auth">View Details</button>
            </div>
        </div>
        </li>
      <hr />



        </ul>
    </div>
</template>

<style scoped>
  .right {float: right;}
  img {
    height: 100px;
    float: left;
    border: 1px;
    margin: 5px;
  }
  .single_event {
    border: red;
    margin: auto;
    padding-top: 5px;
  }
  ul { list-style-type: none; }
</style>
