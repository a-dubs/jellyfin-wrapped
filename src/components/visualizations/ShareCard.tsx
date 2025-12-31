import { forwardRef } from "react";
import "./ShareCard.css";

interface ShareCardProps {
  totalHours: number;
  topGenre: string | null;
  topShow: string | null;
  topMovie: string | null;
  year: number;
}

export const ShareCard = forwardRef<HTMLDivElement, ShareCardProps>(
  ({ totalHours, topGenre, topShow, topMovie, year }, ref) => {
    return (
      <div ref={ref} className="share-card">
        <div className="share-card-content">
          <div className="share-card-header">
            <h2 className="share-card-title">JELLYFIN WRAPPED</h2>
            <p className="share-card-year">{year}</p>
          </div>

          <div className="share-card-stats">
            <div className="share-card-icon">📺</div>
            <div className="share-card-hours">
              {totalHours.toLocaleString()} HOURS
            </div>
          </div>

          <div className="share-card-details">
            {topGenre && (
              <div className="share-card-detail">
                <span className="share-card-label">TOP GENRE:</span>
                <span className="share-card-value">
                  {topGenre.toUpperCase()}
                </span>
              </div>
            )}
            {topShow && (
              <div className="share-card-detail">
                <span className="share-card-label">#1 SHOW:</span>
                <span className="share-card-value">
                  {topShow.toUpperCase()}
                </span>
              </div>
            )}
            {topMovie && (
              <div className="share-card-detail">
                <span className="share-card-label">#1 MOVIE:</span>
                <span className="share-card-value">
                  {topMovie.toUpperCase()}
                </span>
              </div>
            )}
          </div>

          <div className="share-card-footer">
            <div className="share-card-badge">YOUR PERSONAL BEST</div>
          </div>
        </div>
      </div>
    );
  }
);

ShareCard.displayName = "ShareCard";
