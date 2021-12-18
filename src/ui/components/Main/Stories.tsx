import React from "react";
import './stories.scss'

import storyFrame from '../../../public/images/story_frame.svg'

import story1 from '../../../public/images/story01.png'
import story2 from '../../../public/images/story02.png'
import story3 from '../../../public/images/story03.png'
import story4 from '../../../public/images/story04.png'
import story5 from '../../../public/images/story05.png'
import story6 from '../../../public/images/story06.png'

const Stories: React.FC = () => {
    return (
        <div className="stories">
            <ul className="stories-list">
                <li className="story">
                    <img className="story-frame" src={storyFrame} alt="frame" />
                    <img className="story-profile" src={story1} alt="profile" />
                </li>
                <li className="story">
                    <img className="story-frame" src={storyFrame} alt="frame" />
                    <img className="story-profile" src={story2} alt="profile" />
                </li>
                <li className="story">
                    <img className="story-frame" src={storyFrame} alt="frame" />
                    <img className="story-profile" src={story3} alt="profile" />
                </li>
                <li className="story">
                    <img className="story-frame" src={storyFrame} alt="frame" />
                    <img className="story-profile" src={story4} alt="profile" />
                </li>
                <li className="story">
                    <img className="story-frame" src={storyFrame} alt="frame" />
                    <img className="story-profile" src={story5} alt="profile" />
                </li>
                <li className="story">
                    <img className="story-profile" src={story6} alt="profile" />
                </li>
            </ul>
        </div>
    )
}

export default Stories