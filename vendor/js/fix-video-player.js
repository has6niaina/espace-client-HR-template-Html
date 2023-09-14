$(document).ready(function () {
    var t = setInterval(() => {
        //var videos = $('#_com_liferay_document_library_web_portlet_IGDisplayPortlet_INSTANCE_WFhy3Gh5NoPn_objectsSearchContainerPrimaryKeys')
          var videos = $('input[type="hidden"][id*="_objectsSearchContainerPrimaryKeys"]');
          console.error('$:', videos)
        if(videos.length > 0) {
              if(videos.val().length > 0) {
                  clearInterval(t)
                  videos = videos.val().split('},{')
                  videos = videos.map((e) => {
                      var o = {};
                      e = e.replace(/{/g, '').replace(/}/g, '');
                      e = e.split(', ').map(x => {
                          r = x.split('=');
                          o[r[0]] = r[1]
                          return r
                      });
                      return o;
                  })
                  console.error(videos)
                  var iconPlay = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 496.158 496.158" style="enable-background:new 0 0 496.158 496.158;" xml:space="preserve">
<path style="fill:#e85597;" d="M496.158,248.085c0-137.021-111.07-248.082-248.076-248.082C111.07,0.002,0,111.062,0,248.085  c0,137.002,111.07,248.071,248.083,248.071C385.088,496.155,496.158,385.086,496.158,248.085z"/>
<path style="fill:#FFFFFF;" d="M370.805,235.242L195.856,127.818c-4.776-2.934-11.061-3.061-15.951-0.322  c-4.979,2.785-8.071,8.059-8.071,13.762v214c0,5.693,3.083,10.963,8.046,13.752c2.353,1.32,5.024,2.02,7.725,2.02  c2.897,0,5.734-0.797,8.205-2.303l174.947-106.576c4.657-2.836,7.556-7.986,7.565-13.44  C378.332,243.258,375.452,238.096,370.805,235.242z"/></svg>`;
                  videos.forEach(e => {
                      console.log('get video:', e)
                      var v = $('[thumbnailid="entry_' + e.fileEntryId + '"]');
                      var uriVideo = `/documents/${e.groupId}/0/${e.title}/${e.uuid}`;
                      v.attr('href', uriVideo);
                      v.find('svg').replaceWith(iconPlay);
                      v.find('.card').append("<b>%title%</b>".replace('%title%', e.title).replace('.'+e.extension, ''));
                      console.log('set video:', e)
                  });
                  $('[thumbnailid]').off('click').on('click', function() {
                      //hide image-viewer-hidden
                      var videoIn = $('.video-player-in')
                      videoIn.remove()
                      var parent = $(".image-viewer-base.image-viewer, .image-viewer-mask").attr('hidden', 'hidden');

                      var p = `<div class="video-player-in">
                <div class="close fa fa-close"></div>
				<div class="backdrop"></div>
				<video id="in-video" controls controlsList="nodownload" autoplay>
	              <source src="%URL%" type="video/mp4">
	            </video>
            </div>`;
                      p = p.replace('%URL%', $(this).attr('href'));
                      $('body').append(p)

                  });
                  $('body').on('click', '.close', function() {
                      $('.video-player-in').remove()
                  })
              }
        } else {
            clearInterval(t)
        }
        console.log('END TIME OUT')
    }, 2000)
});