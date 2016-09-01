defmodule ProbabilityWeighTingFunction.Participant do
  alias ProbabilityWeighTingFunction.Actions

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
    add.add
    nextadd = add["add"]
    if data.participants[id].befor != -1 do
      if add["choice"] == data.participants[id].befor do
       nextadd = add["add"]
     else
        nextadd = div(add["add"], 2)
      end
    end
    data = data
           |>put_in([:participants,id,:slideIndex],slideIndex)
           |>put_in([:participants, id, :add], div(abs(add["add"]), 2))
           |>put_in([:participants, id, :befor], add["choice"])
    Actions.next(data,id,slideIndex)
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
      actives: Map.size(data.participants)
    }
  end

  def format_contents(data, id) do
    %{participants: participants} = data
    participant = Map.get(participants, id)
    format_participant(participant)
      |> Map.merge(format_data(data))
  end
end