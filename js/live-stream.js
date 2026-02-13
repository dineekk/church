// Live Stream Auto-Switcher for Elim New Jerusalem Church
// Automatically shows Main Channel (Sunday/Friday) or Shorts Channel (Daily)

const LIVE_STREAMS = {
  // Main YouTube Channel - Elim New Jerusalem Church Official
  mainChannel: {
    name: 'Main Channel',
    channelUrl: 'https://www.youtube.com/@ElimNewJerusalemChurchOfficial',
    liveUrl: 'https://www.youtube.com/@ElimNewJerusalemChurchOfficial/live',
    embedUrl: 'https://www.youtube.com/embed/live_stream?channel=UCyour_main_channel_id', // Replace with actual channel ID
    days: [0, 5], // Sunday = 0, Friday = 5
    times: [
      { start: '05:30', end: '07:30' },  // Sunday 5:30-7:30am
      { start: '08:30', end: '10:30' },  // Sunday 8:30-10:30am
      { start: '11:00', end: '13:30' },  // Friday 11am-1:30pm OR Sunday 11:30am-1:30pm
      { start: '11:30', end: '13:30' }   // Sunday 11:30am-1:30pm
    ],
    title: 'Live Worship Service',
    description: 'Join us for live worship, prayer, and powerful messages'
  },
  
  // YouTube Shorts Channel - ENJC Shorts
  shortsChannel: {
    name: 'Shorts Channel',
    channelUrl: 'https://www.youtube.com/@ENJCShorts',
    liveUrl: 'https://www.youtube.com/@ENJCShorts/live',
    embedUrl: 'https://www.youtube.com/embed/live_stream?channel=UCyour_shorts_channel_id', // Replace with actual channel ID
    days: [0, 1, 2, 3, 4, 5, 6], // Every day
    times: [
      { start: '00:00', end: '23:59' } // All day
    ],
    title: 'Daily Devotional Live',
    description: 'Quick devotionals and faith encouragement throughout the day'
  }
};

// Check if current time is within schedule
function isLiveTime(schedule) {
  const now = new Date();
  const currentDay = now.getDay();
  const currentTime = now.getHours() * 60 + now.getMinutes();
  
  // Check if today is in schedule
  if (!schedule.days.includes(currentDay)) {
    return false;
  }
  
  // Check if current time is within any time slot
  return schedule.times.some(slot => {
    const [startHour, startMin] = slot.start.split(':').map(Number);
    const [endHour, endMin] = slot.end.split(':').map(Number);
    const startTime = startHour * 60 + startMin;
    const endTime = endHour * 60 + endMin;
    
    return currentTime >= startTime && currentTime <= endTime;
  });
}

// Get active live stream
function getActiveLiveStream() {
  // Priority 1: Main channel on Sunday/Friday scheduled times
  if (isLiveTime(LIVE_STREAMS.mainChannel)) {
    return LIVE_STREAMS.mainChannel;
  }
  
  // Priority 2: Shorts channel (daily fallback)
  if (isLiveTime(LIVE_STREAMS.shortsChannel)) {
    return LIVE_STREAMS.shortsChannel;
  }
  
  // No live stream scheduled
  return null;
}

// Display live stream
function displayLiveStream() {
  const activeStream = getActiveLiveStream();
  const container = document.getElementById('live-stream-container');
  const section = document.getElementById('live-stream-section');
  
  if (!container || !section) return;
  
  if (activeStream) {
    // Show the live stream section
    section.style.display = 'block';
    
    container.innerHTML = `
      <div style="max-width: 900px; margin: 0 auto;">
        <div class="live-indicator" style="background: #ff0000; color: white; padding: 12px 20px; text-align: center; font-weight: bold; margin-bottom: 20px; border-radius: 8px; animation: pulse 2s infinite;">
          🔴 LIVE NOW - ${activeStream.title}
        </div>
        <div class="video-wrapper" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 12px; box-shadow: 0 10px 40px rgba(0,0,0,0.3);">
          <iframe 
            style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
            src="${activeStream.embedUrl}?autoplay=1&mute=0" 
            title="${activeStream.title}"
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
          </iframe>
        </div>
        <div style="margin-top: 25px; text-align: center;">
          <p style="color: rgba(255,255,255,0.95); margin-bottom: 20px; font-size: 1.15rem; line-height: 1.6;">${activeStream.description}</p>
          <a href="${activeStream.liveUrl}" class="btn" style="background: white; color: #667eea; padding: 14px 35px; border-radius: 30px; text-decoration: none; display: inline-block; font-weight: bold; font-size: 1.05rem; transition: transform 0.2s;" target="_blank">Watch on YouTube</a>
        </div>
      </div>
    `;
  } else {
    // Hide the live stream section when offline
    section.style.display = 'none';
  }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.8; transform: scale(1.02); }
  }
  
  .btn:hover {
    transform: scale(1.05);
  }
`;
document.head.appendChild(style);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  displayLiveStream();
  
  // Update every minute
  setInterval(displayLiveStream, 60000);
  
  // Debug log
  console.log('🔴 Live stream checker initialized');
  console.log('⏰ Current time:', new Date().toLocaleTimeString());
  console.log('📅 Current day:', ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][new Date().getDay()]);
});
