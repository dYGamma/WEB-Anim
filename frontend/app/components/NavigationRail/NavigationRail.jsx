"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useUserStore } from "@/app/store/user-store";
import { useRouter } from "next/navigation";
import useCopyToClipboard from "@/app/hooks/useCopyToClipboard";

export const NavigationRail = (props) => {
  const [isCopied, copyToClipboard] = useCopyToClipboard();
  const pathname = usePathname();
  const userStore = useUserStore();
  const router = useRouter();

  const items = [
    {
      title: "Главная",
      icon: "home",
      path: "/",
    },
    {
      title: "Поиск",
      icon: "search",
      path: "/search",
    },
    {
      title: "Закладки",
      icon: "bookmark",
      path: "/bookmarks",
    },

    {
      title: "Избранное",
      icon: "favorite",
      path: "/favorites",
    },

    {
      title: "История",
      icon: "history",
      path: "/history",
    },
  ];

  return (
    <nav
      className="left round margin"
      style={{
        inlineSize: "unset",
        position: "sticky",
        top: "1rem",
        left: "0",
        minHeight: "calc(100vh - (var(---margin) * 2))",
        backgroundColor: "var(--surface)",
        paddingBlock: "1rem",
      }}
    >
      {userStore.isAuth && userStore.user ? (
        <Link className="circle transparent " href="/profile">
          <Image
            className="responsive"
            src={userStore.user.profile.avatar}
            alt="Ваш профиль"
            width="64"
            height="64"
          />
          <div className="tooltip right round">
            {" "}
            {userStore.isAuth && (
              <button
                className="transparent"
                onClick={() => userStore.logout()}
              >
                Желаете сменить аккаунт?
              </button>
            )}
          </div>
        </Link>
      ) : (
        <button
          className="circle transparent"
          onClick={() => {
            router.push("/login");
          }}
        >
          <i className="responsive">login</i>
        </button>
      )}

      {items.map((item) => {
        return (
          <Link
            key={item.path}
            href={item.path}
            className={pathname == item.path ? "active" : ""}
          >
            <i>{item.icon}</i>
            <div>{item.title}</div>
          </Link>
        );
      })}

      <span className="max"></span>

      {/* <button className="circle transparent" onClick={() => copyToClipboard()}>
        <i>{isCopied ? "done" : "content_copy"}</i>
        <div className="tooltip right">
          {isCopied ? "Ссылка скопирована" : "Скопировать ссылку"}
        </div>
      </button> */}

      <button
        className="circle transparent"
        onClick={() => props.setSettingsPopup(!props.settingsPopup)}
      >
        <i>settings</i>
      </button>

      <button
        className="circle transparent"
        onClick={() => props.setColorPicker(!props.colorPicker)}
      >
        <i>palette</i>
      </button>
    </nav>
  );
};
