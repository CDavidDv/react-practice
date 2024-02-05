import './App.css'
import { TwitterFollowCard } from './TwitterFollowCard'

export function App () {
    return(
        <section className='App'>
            <TwitterFollowCard 
                userName="midudev" 
                initialIsFollowing 
            >
                Miguel Angel Duran
            </TwitterFollowCard>
            <TwitterFollowCard 
                userName="devcaress" 
                initialIsFollowing ={false}
            >
                Daniel Cares xd
            </TwitterFollowCard>
            <TwitterFollowCard 
                userName="XXXXXXX"
                initialIsFollowing ={false}
            >
                Miguel Angel Duran
            </TwitterFollowCard>    
        </section>    
    )
}