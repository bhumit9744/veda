import React, { forwardRef } from 'react';

const ChapterContent = forwardRef(({ data, layoutClass = 'layout-left' }, ref) => {
  return (
    <section className={`chapter-section ${layoutClass}`} ref={ref}>
      <div className="chapter-inner">
        {data.label && <div className="chapter-label">{data.label}</div>}
        
        {data.supporting && <div className="chapter-supporting">{data.supporting}</div>}
        
        {data.headline && (
          <h2 className="chapter-headline">
            {data.headline}
          </h2>
        )}
        
        {data.body && <p className="chapter-body">{data.body}</p>}
        
        {data.secondaryBody && <p className="chapter-body secondary">{data.secondaryBody}</p>}
        
        {data.statements && (
          <div className="statements-list">
            {data.statements.map((stmt, idx) => (
              <h3 key={idx} className="statement-item">{stmt}</h3>
            ))}
          </div>
        )}
        
        {data.closing && <div className="chapter-closing">{data.closing}</div>}
      </div>
    </section>
  );
});

export default ChapterContent;
