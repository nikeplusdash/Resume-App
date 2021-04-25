import React, { memo } from 'react'
import twemoji from 'twemoji'

const Twemoji = ({ classAssign,emoji }) => (
  <span
    className={classAssign}
    dangerouslySetInnerHTML={{
      __html: twemoji.parse(emoji, {
        folder: 'svg',
        ext: '.svg'
      })
    }}
  />
)

export default memo(Twemoji)