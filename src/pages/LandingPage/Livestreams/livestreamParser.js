import { pad } from "../../../util/utils";

export const STATE_WAIT = 0,
  STATE_LIVE = 1,
  STATE_OVER = 2;

export const parseLivestreams = (ls, now) =>
  ls
    .map((l) => parseLivestream(l, now))
    .filter((l) => l.published)
    .sort((a, b) => a.publish - b.publish);

const parseLivestream = (livestream, now) => {
  var arr = `${livestream.date} ${livestream.time}:00`.split(/[- :]/);
  const airTime = new Date(arr[0], arr[1]-1, arr[2], arr[3], arr[4], arr[5]).getTime();
  const countdown = Math.ceil((airTime - now) / 1000);
  const prepublishTime = +livestream.prepublish_time * 60000;
  const duration = +livestream.duration * 60000;
  return {
    ...livestream,
    publish: airTime - prepublishTime,
    published:
      new Date(livestream.publish_start) < now &&
      now < new Date(livestream.publish_end),
    state:
      airTime - prepublishTime > now
        ? STATE_WAIT
        : airTime + duration > now
        ? STATE_LIVE
        : STATE_OVER,
    countdown,
    countdownString: [
      countdown > 3600 ? Math.floor(countdown / 3600) : null,
      Math.floor(countdown / 60) % 60,
      countdown % 60,
    ]
      .filter((x) => x !== null)
      .map((x) => pad(x))
      .join(":"),
  };
};
