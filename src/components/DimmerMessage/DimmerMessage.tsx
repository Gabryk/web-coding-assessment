import { Dimmer, Header, Icon, SemanticICONS } from "semantic-ui-react";

interface DimmerMessageProps {
  active?: boolean
  icon: SemanticICONS
  text: string
}

const DimmerMessage = ({ icon, text, active }: DimmerMessageProps) => {
  return (
    <Dimmer active={active}>
      <Header as='h2' icon inverted>
        <Icon name={icon} />
        {text}
      </Header>
    </Dimmer>
  );
};

export default DimmerMessage;
