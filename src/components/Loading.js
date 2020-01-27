import React from 'react'
import { Dimmer, Loader, Segment } from 'semantic-ui-react'

const Loading = () => (
  <div className="loading">
    <Segment >
      <Dimmer active> 
        <Loader className="loading"><i class="fa fa-spinner"></i><br/>Loading</Loader>
      </Dimmer>
    </Segment>
  </div>
)

export default Loading;