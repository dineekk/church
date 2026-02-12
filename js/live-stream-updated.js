// Live Stream Schedule Handler
// Auto-switches between Main YouTube and Shorts channel based on day/time

const LIVE_STREAMS = {
  // Main YouTube Channel (Friday & Sunday)
  mainChannel: {
    channelId: 'UC_YOUR_MAIN_CHANNEL_ID', // Replace with your main channel ID
    liveUrl: 'https://www.youtube.com/@YourMainChannel/live', // Replace with your channel
    embedUrl: 'https://www.youtube.com/embed/live_stream?channel=UC_YOUR_MAIN_CHANNEL_ID', // Replace channel ID
    days: [0, 5], // Sunday = 0, Friday = 5
    times: [
      { start: '05:30', end: '07:30' },
      { start: '08:30', end: '10:30' },
      { start: '11:00', end: '13:30' },
      { start: '11:30', end: '13:30' }
    ],
    title: 'Live Worship Service',
    description: 'Join us for live worship, prayer, and powerful messages'
  },
  
  // YouTube Shorts Channel (Daily)
  shortsChannel: {
    channelId: 'UC_YOUR_SHORTS_CHANNEL_ID', // Replace with your shorts channel ID
    liveUrl: 'https://www.youtube.com/@YourShortsChannel/live', // Replace with your shorts channel
    embedUrl: 'https://www.youtube.com/embed/live_stream?channel=UC_YOUR_SHORTS_CHANNEL_ID', // Replace channel ID
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
  // Priority 1: Main channel on scheduled days/times (Sunday & Friday)
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
        <div class="live-indicator" style="background: #ff0000; color: white; padding: 12px; text-align: center; font-weight: bold; margin-bottom: 15px; border-radius: 8px; animation: pulse 2s infinite;">
          🔴 LIVE NOW - ${activeStream.title}
        </div>
        <div class="video-wrapper" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 10px; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
          <iframe 
            style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
            src="${activeStream.embedUrl}?autoplay=1&mute=0" 
            title="${activeStream.title}"
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
          </iframe>
        </div>
        <div style="margin-top: 20px; text-align: center;">
          <p style="color: rgba(255,255,255,0.9); margin-bottom: 15px; font-size: 1.1rem;">${activeStream.description}</p>
          <a href="${activeStream.liveUrl}" class="btn" style="background: white; color: #667eea; padding: 12px 30px; border-radius: 25px; text-decoration: none; display: inline-block; font-weight: bold;" target="_blank">Watch on YouTube</a>
        </div>
      </div>
    `;
  } else {
    // Hide the live stream section when offline
    section.style.display = 'none';
  }
}

// Add CSS animation for pulsing effect
const style = document.createElement('style');
style.textContent = `
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }
`;
document.head.appendChild(style);

// Initialize and update every minute
document.addEventListener('DOMContentLoaded', () => {
  displayLiveStream();
  
  // Update every minute to check schedule
  setInterval(displayLiveStream, 60000); // Check every 60 seconds
});
