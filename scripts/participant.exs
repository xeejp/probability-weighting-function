defmodule ProbabilityWeighTingFunction.Participant do
  alias ProbabilityWeighTingFunction.Actions

  require Logger

  # Actions
  def fetch_contents(data, id) do
    Actions.update_participant_contents(data, id)
  end

  def set_question(data,id,question) do
    data = data
           |>put_in([:participants,id,:question],question)
           |>put_in([:participants,id,:state],1)
    Actions.set_question(data,id,question)
  end

  def next(data,id,add) do
    slideIndex = get_in(data,[:participants,id,:slideIndex])
    slideIndex = slideIndex + 1
      n = to_string(add["type"])
    if n != "6" do
      nextadd = add["add"]
      data = data |> put_in([:participants, id, :plus], add["plus"])
     if data.participants[id].befor[n] != -1 do
       if add["choice"] != data.participants[id].befor[n] do
         data = data |> put_in([:participants, id, :down, n], true)
       end
        if data.participants[id].down[n], do: data = data |> put_in([:participants, id, :plus, n], div(data.participants[id].plus[n], 2))
        nextadd = nextadd |> Map.put(n, add["add"][n] + data.participants[id].plus[n])
     else
        nextadd = nextadd |> Map.put(n, add["add"][n] + data.participants[id].plus[n])
      end
      data = data |> put_in([:participants, id, :add], nextadd)
                       |> put_in([:participants, id, :befor, n], add["choice"])
    end
    data = data
           |>put_in([:participants,id,:slideIndex],slideIndex)
    case n do
      "7" -> Actions.finish(data = data |> put_in([:participants,id,:state],2), id)
        _  -> Actions.next(data,id,slideIndex)
    end
  end

  def finish(data,id) do
    data = data
           |>put_in([:participants,id,:state],2)
    Actions.finish(data,id)
  end

  # Utilities
  def format_participant(participant), do: participant

  def format_data(data) do
    %{
      page: data.page,
      money: data.money,
      unit: data.unit,
      anses: data.anses,
      joined: Map.size(data.participants)
    }
  end

  def format_contents(data, id) do
    %{participants: participants} = data
    participant = Map.get(participants, id)
    format_participant(participant)
      |> Map.merge(format_data(data))
  end
end