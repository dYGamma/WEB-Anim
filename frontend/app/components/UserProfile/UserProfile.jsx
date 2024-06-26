import Image from "next/image";
import { ReleaseCard } from "../ReleaseCard/ReleaseCard";
import { getData } from "@/app/api/api-utils";
import { endpoints } from "@/app/api/config";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTiktok,
  faVk,
  faInstagram,
  faTelegram,
} from "@fortawesome/free-brands-svg-icons";

function getNoun(number, one, two, five) {
  let n = Math.abs(number);
  n %= 100;
  if (n >= 5 && n <= 20) {
    return five;
  }
  n %= 10;
  if (n === 1) {
    return one;
  }
  if (n >= 2 && n <= 4) {
    return two;
  }
  return five;
}

function convertMinutes(min) {
  const d = Math.floor(min / 1440); // 60*24
  const h = Math.floor((min - d * 1440) / 60);
  const m = Math.round(min % 60);

  var dDisplay = d > 0 ? `${d} ${getNoun(d, "день", "дня", "дней")}, ` : "";
  var hDisplay = h > 0 ? `${h} ${getNoun(h, "час", "часа", "часов")}, ` : "";
  var mDisplay = m > 0 ? `${m} ${getNoun(m, "минута", "минуты", "минут")}` : "";
  return dDisplay + hDisplay + mDisplay;
}

export const UserProfile = (props) => {
  const [lastWatched, setLastWatched] = useState();
  const router = useRouter();

  useEffect(() => {
    async function _getData() {
      const data = await getData(
        `${endpoints.user.profile}/${props.profile.id}`,
      );
      setLastWatched(data.profile.history);
    }
    _getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hasSocials =
    props.profile.vk_page != "" ||
    props.profile.tg_page != "" ||
    props.profile.tt_page != "" ||
    props.profile.inst_page != "" ||
    false;
  const socials = [
    {
      name: "vk",
      nickname: props.profile.vk_page,
      icon: faVk,
      urlPrefix: "https://vk.com",
    },
    {
      name: "telegram",
      nickname: props.profile.tg_page,
      icon: faTelegram,
      urlPrefix: "https://t.me",
    },
    {
      name: "tiktok",
      nickname: props.profile.tt_page,
      icon: faTiktok,
      urlPrefix: "https://tiktok.com",
    },
    {
      name: "instagram",
      nickname: props.profile.inst_page,
      icon: faInstagram,
      urlPrefix: "https://instagram.com",
    },
  ];

  return (
    <>
      <div className="grid">
        <div className="s4">
          <article className="primary-container">
            <i className="extra">account_circle</i>
            <div className="row">
              <Image
                className="circle"
                src={props.profile.avatar}
                alt=""
                width="512"
                height="512"
                style={{ blockSize: "7rem", inlineSize: "7rem" }}
              />
              <div className="max">
                <h5>Привет, {props.profile.login}!</h5>
                <p>Статус: {props.profile.status}</p>
              </div>
            </div>
          </article>
          {hasSocials ? (
            <article className="fill">
              <div className="row ">
                <i className="extra">workspaces</i>
                <h5 с>Твои социальные сети</h5>
              </div>
              <div className="row">
                {socials.map((item) => {
                  return item.nickname != "" ? (
                    <button
                      className="large circle tertiary-container"
                      key={item.name}
                      onClick={() =>
                        router.push(`${item.urlPrefix}/${item.nickname}`)
                      }
                    >
                      <FontAwesomeIcon icon={item.icon} />
                    </button>
                  ) : (
                    ""
                  );
                })}
              </div>
            </article>
          ) : (
            ""
          )}
        </div>
        <div className="s4">
          <article className="secondary-container">
            <i className="extra">avg_pace</i>
            <h5>Активность</h5>
            <div className="row">
              <div className="center-align">
                <h5 className="small">{props.profile.comment_count}</h5>
                <p>Комментарии</p>
              </div>
              <div className="center-align">
                <h5 className="small">{props.profile.video_count}</h5>
                <p>Видео</p>
              </div>
              <div className="center-align">
                <h5 className="small">{props.profile.collection_count}</h5>
                <p>Коллекции</p>
              </div>
              <div className="center-align">
                <h5 className="small">{props.profile.friend_count}</h5>
                <p>Друзья</p>
              </div>
            </div>
          </article>
        </div>
        <div className="s4 ">
          <article className="tertiary-container">
            <i className="extra">show_chart</i>
            <div>
              <h5>Статистика</h5>
              <div>
                <p className="small">
                  Просмотрено серий:{" "}
                  <span className="bold">
                    {props.profile.watched_episode_count}
                  </span>
                </p>
                <p className="small">
                  Время просмотра:{" "}
                  <span className="bold">
                    {convertMinutes(props.profile.watched_time)}
                  </span>
                </p>
              </div>
              <div>
                <div>
                  <p>
                    <i>play_arrow</i> Смотрю:{" "}
                    <span className="bold">{props.profile.watching_count}</span>
                  </p>
                  <p>
                    <i>note_stack</i> В Планах:{" "}
                    <span className="bold">{props.profile.plan_count}</span>
                  </p>
                  <p>
                    <i>done</i> Просмотрено:{" "}
                    <span className="bold">
                      {props.profile.completed_count}
                    </span>
                  </p>
                  <p>
                    <i>schedule</i> Отложено:{" "}
                    <span className="bold">{props.profile.hold_on_count}</span>
                  </p>
                  <p>
                    <i>backspace</i> Брошено:{" "}
                    <span className="bold">{props.profile.dropped_count}</span>
                  </p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
      {lastWatched ? (
        <article className="grid">
          <div className="row s12">
            <i>tab_recent</i>
            <h5>Недавно просмотрено</h5>
          </div>
          <nav className="s12 scroll column">
            {lastWatched.map((item) => {
              return (
                <ReleaseCard
                  key={item.id}
                  id={item.id}
                  title={item.title_ru}
                  poster={item.image}
                  description={
                    item.last_view_episode.name ||
                    `${item.last_view_episode.position + 1} серия`
                  }
                />
              );
            })}
          </nav>
        </article>
      ) : (
        <progress></progress>
      )}
    </>
  );
};
