import React, { useState } from "react";
import { Blurhash } from "react-blurhash";
import { Link } from "react-router-dom";

import "../../../css/lastplayed.css";
import { Trans } from "react-i18next";

function RecentlyAddedCard(props) {
  const [loaded, setLoaded] = useState(false);
  const twelve_hr = JSON.parse(localStorage.getItem("12hr"));
  const localization = localStorage.getItem("i18nextLng");

  const options = {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    // second: "numeric",
    hour12: twelve_hr,
  };

  return (
    <div className="last-card">
      <Link to={`/libraries/item/${(props.data.NewEpisodeCount != undefined ? props.data.SeasonId : props.data.EpisodeId)  ?? props.data.Id}`}>
        <div className="last-card-banner">
          {loaded ? null : props.data.PrimaryImageHash ? (
            <Blurhash hash={props.data.PrimaryImageHash} width={"100%"} height={"100%"} className="rounded-3 overflow-hidden" />
          ) : null}
          <img
            src={`${
              "/proxy/Items/Images/Primary?id=" +
              (props.data.Type === "Episode" ? props.data.SeriesId : props.data.Id) +
              "&fillHeight=320&fillWidth=213&quality=50"
            }`}
            alt=""
            onLoad={() => setLoaded(true)}
            style={loaded ? {} : { display: "none" }}
          />
        </div>
      </Link>

      <div className="last-item-details">
        <div className="last-last-played">
          {Intl.DateTimeFormat(localization, options).format(new Date(props.data.DateCreated))}
        </div>

        <div className="last-item-name">
          <Link to={`/libraries/item/${props.data.SeriesId ?? props.data.Id}`}>{props.data.SeriesName ?? props.data.Name}</Link>
        </div>
        {props.data.Type === "Episode" && props.data.NewEpisodeCount == undefined && (
          <div className="last-item-episode">
            <Link to={`/libraries/item/${props.data.EpisodeId}`}>{props.data.Name}</Link>
          </div>
        )}
      </div>

      {props.data.SeasonNumber && props.data.NewEpisodeCount == undefined && (
        <div className="last-item-episode number">
          S{props.data.SeasonNumber} - E{props.data.EpisodeNumber}
        </div>
      )}

      {props.data.SeasonNumber && props.data.NewEpisodeCount != undefined && (
        <div className="last-item-episode number pt-0 pb-1">
          <Trans i18nKey="SEASON" /> {props.data.SeasonNumber}
        </div>
      )}

      {props.data.NewEpisodeCount && (
        <div className="last-item-episode number pt-0">
          {props.data.NewEpisodeCount} <Trans i18nKey="EPISODES" />
        </div>
      )}
    </div>
  );
}

export default RecentlyAddedCard;
