import { useState } from "react"

export function TwitterFollowCard ({ children, userName, initialIsFollowing }){
    const [isFollowing, setIsFollowing] =  useState(initialIsFollowing )
    
    const buttonText = isFollowing ? 'Siguiendo' : 'Seguir'
    const buttonClassName = isFollowing ? 'tw-followCard-button is-following' : 'tw-followCard-button'

    const handleClick = () => {
        setIsFollowing(!isFollowing)
      }

      
    return(<article className='tw-followCard'>
        <header className='tw-followCard-header'>
            <img className='tw-followCard-avatar' src={`https://unavatar.io/${userName}`} alt="asd" />
            <div className='tw-followCard-info'>
                <strong className=''>{children}</strong>
                <span className=''>@{userName}</span>
            </div>
        </header>

        <aside>
            <button className={buttonClassName} onClick={handleClick}>
                <span className='tw-followCard-text'>{buttonText}</span>
          <span className='tw-followCard-stopFollow'>Dejar de seguir</span>
          </button>
        </aside>
    </article>
    )
}