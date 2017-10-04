class Model 
{
  constructor() 
  {
    this.invitedList = [];
    this.inputValue = "";     
    this.callback = null;
  }
  subscribe(render) 
  {
    this.callback = render;
  }
  notify() 
  {
    this.callback();
  }
  addInvited(text) 
  {
    this.invitedList.push(
    {
        text: text,
        listItemclassName: "",
    });
    this.inputValue = "";
    this.notify();
  }
  removeInvited(text) 
  {
    this.invitedList = this.invitedList.filter(item => item !== text);
    this.notify();
  }
  checkbox(checked, index)
  {
    if(checked) 
    {
      this.invitedList[index].listItemClassName = 'responded';
    } 
    else 
    {
      this.invitedList[index].listItemClassName = '';
    }
    this.notify();
  }
}

const Header = ({model}) => 
{
  return (
    <header>
        <h1>RSVP</h1>
        <p> Registration App </p>
        <form id="registrar" onSubmit={e => {
          e.preventDefault();
          model.addInvited(model.inputValue);
        }}>
          <input type="text" name="name" placeholder="Invite Someone" value={model.inputValue} onChange={e => {
            model.inputValue = e.target.value;
            model.notify()
          }}/>
          <button type="submit" name="submit" value="submit">Submit</button>
        </form>
    </header>
  )
}

const Main = ({model}) => 
{
  const list = model.invitedList.map((item, index) => 
  {
    return (
      <li key={index} className={item.listItemClassName}>
        {item.text} 
        <label>Confirmed<input type="checkbox" name="" id="" onChange={(e) => model.checkbox(e.target.checked, index)}/></label>
        <button onClick={() => model.removeInvited(item)}>Remove</button>
      </li>
    )
  });
    return (
      <div className="main">	
        <h2>Invitees</h2>
        <ul id="invitedList">{list}</ul>	
      </div>
    );
}

const Application = ({model}) => 
{
  return (
    <div>
      <Header model={model} />
      <Main model={model} />
    </div>
  );
}

let model = new Model();

let render = () => 
{
  ReactDOM.render(
    <Application model={model} />,
    document.getElementById('container')
  );
};

model.subscribe(render); 

render(); 